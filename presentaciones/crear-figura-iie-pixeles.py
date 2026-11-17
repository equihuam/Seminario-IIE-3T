"""Figura cartográfica y esquema de índices; no ejecuta el modelo del IIE.

Desde la raíz: .venv/Scripts/python.exe presentaciones/crear-figura-iie-pixeles.py
Entradas originales inmutables en presentaciones/img; salidas en esa carpeta.
Requiere una banda por archivo, CRS conocido, IIE en [0,1] y clases enteras.
"""
from pathlib import Path
import hashlib
import json
import platform
import xml.etree.ElementTree as ET

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap, ListedColormap
from matplotlib.patches import Rectangle, ConnectionPatch, FancyBboxPatch
from matplotlib.cm import ScalarMappable
import numpy as np
import rasterio
from rasterio.enums import Resampling
from rasterio.warp import reproject, transform
from rasterio.windows import Window

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "presentaciones/img"
# La figura sin sufijo conserva la edición manual aprobada de Miguel (P-ME-062).
# Regenerar la base cartográfica no debe sobrescribir ese trabajo.
STEM = "iie-2018-pixeles-holdridge-base"
INK, MUTED, TEAL = "#18343a", "#52656a", "#087e86"
BG = "#fafaf7"
CMAP = LinearSegmentedColormap.from_list("iie", ["#8c422f", "#d7a65a", "#f1e2ac", "#8fac72", "#366852", "#123e3a"])
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 12, "text.color": INK,
                     "svg.fonttype": "none", "svg.hashsalt": STEM, "axes.edgecolor": MUTED})


def metadata(ds):
    return {"path": Path(ds.name).relative_to(ROOT).as_posix(),
            "sha256": hashlib.sha256(Path(ds.name).read_bytes()).hexdigest(),
            "width": ds.width, "height": ds.height, "dtype": ds.dtypes[0],
            "nodata": ds.nodata, "crs_wkt": ds.crs.to_wkt(),
            "transform": list(ds.transform)[:6], "resolution": list(ds.res),
            "tags": ds.tags(), "band_tags": ds.tags(1)}


def caption(fig, x, y, text, size=12, **kw):
    return fig.text(x, y, text, fontsize=size, va="top", **kw)


def prepare():
    with rasterio.open(OUT / "ie_2018_st_v2.tif") as src, rasterio.open(OUT / "zvh-mx3qw-mexico-Albers.tif") as zones:
        if src.count != 1 or zones.count != 1 or not src.crs or not zones.crs:
            raise ValueError("Se requiere una banda y CRS conocido por archivo.")
        if src.scales != (1.0,) or src.offsets != (0.0,):
            raise ValueError("Escala/offset no previstos; revisar antes de representar.")
        # Inspección completa por bloques; no se usa el mínimo/máximo de metadatos.
        lo, hi, count = float("inf"), -float("inf"), 0
        for start in range(0, src.height, 256):
            a = src.read(1, window=Window(0, start, src.width, min(256, src.height-start)), masked=True)
            v = a.compressed()
            if v.size:
                if not np.isfinite(v).all():
                    raise ValueError("IIE contiene valores no finitos sin máscara.")
                lo, hi, count = min(lo, float(v.min())), max(hi, float(v.max())), count + v.size
        if not count or lo < 0 or hi > 1:
            raise ValueError(f"Rango IIE inesperado: {lo}, {hi}")
        # Vista nacional reducida solamente para visualización, por vecino cercano.
        height, width = 840, 1320
        overview = src.read(1, out_shape=(height, width), masked=True, resampling=Resampling.nearest).filled(np.nan)
        ov_transform = src.transform * src.transform.scale(src.width/width, src.height/height)
        zone_view = np.zeros((height, width), dtype=np.uint8)
        reproject(rasterio.band(zones, 1), zone_view, src_transform=zones.transform,
                  src_crs=zones.crs, src_nodata=zones.nodata, dst_transform=ov_transform,
                  dst_crs=src.crs, dst_nodata=0, resampling=Resampling.nearest)
        codes = np.unique(zones.read(1, masked=True).compressed()).tolist()
        # Ventana ilustrativa próxima al centro de Veracruz: busca frontera de clase
        # y 64 celdas válidas. No es muestreo representativo ni selección analítica.
        xx, yy = transform("EPSG:4326", src.crs, [-96.9], [19.4])
        row, col = src.index(xx[0], yy[0])
        candidates = [(dr, dc) for dr in range(-100, 101, 4) for dc in range(-100, 101, 4)]
        candidates.sort(key=lambda p: (p[0]**2+p[1]**2, p))
        chosen = None
        # Remuestreo único del entorno, seguido de búsqueda en memoria.
        search = Window(col-104, row-104, 216, 216)
        local = src.read(1, window=search, masked=True)
        hz = np.zeros(local.shape, dtype=np.uint8)
        reproject(rasterio.band(zones, 1), hz, src_transform=zones.transform, src_crs=zones.crs,
                  src_nodata=zones.nodata, dst_transform=src.window_transform(search),
                  dst_crs=src.crs, dst_nodata=0, resampling=Resampling.nearest)
        for dr, dc in candidates:
            r, c = dr+104, dc+104
            a, z = local[r:r+8, c:c+8], hz[r:r+8, c:c+8]
            ids, counts = np.unique(z, return_counts=True)
            if a.shape == (8,8) and a.count() == 64 and len(ids) == 2 and ids.min() > 0 and counts.min() >= 12:
                chosen = Window(col+dc, row+dr, 8, 8), a, z
                break
        if chosen is None:
            raise ValueError("No se encontró una ventana válida con dos clases; revisar selección.")
        win, close, zclose = chosen
        # Comprueba cada clase del detalle contra consulta directa al raster original.
        tr = src.window_transform(win)
        centers = [tr*(c+.5, r+.5) for r in range(8) for c in range(8)]
        zx, zy = transform(src.crs, zones.crs, [p[0] for p in centers], [p[1] for p in centers])
        direct = np.array([v[0] for v in zones.sample(zip(zx,zy))]).reshape(8,8)
        np.testing.assert_array_equal(zclose, direct)
        np.testing.assert_array_equal(close, src.read(1, window=win))
        meta = {"registered_date": "2026-10-12", "inputs": [metadata(src), metadata(zones)],
                "IIE_full_scan": {"min":lo, "max":hi, "valid_count":int(count)},
                "holdridge_codes": codes,
                "detail": {"window_col_row_width_height":list(win.flatten()),
                           "transform":list(tr)[:6], "IIE":close.tolist(), "holdridge":zclose.tolist()},
                "processing": "Vecino más cercano. IIE nacional reducido 10x para mostrar; detalle nativo 8x8. Holdridge asignado por centro de celda. Sin entrenamiento ni inferencia.",
                "versions": {"python":platform.python_version(),"rasterio":rasterio.__version__,
                             "GDAL":rasterio.__gdal_version__,"numpy":np.__version__,"matplotlib":matplotlib.__version__}}
        return overview, zone_view, close, zclose, src.bounds, tr, meta


def main():
    overview, zone_view, close, zclose, bounds, tr, meta = prepare()
    extent = [bounds.left, bounds.right, bounds.bottom, bounds.top]
    fig = plt.figure(figsize=(18, 11), facecolor=BG)
    caption(fig,.035,.965,"UN MODELO COMPARTIDO, MILLONES DE PÍXELES",25,weight="bold")
    caption(fig,.035,.917,"Integridad ecosistémica de México · 2018",20,color=TEAL)
    caption(fig,.035,.867,"01  EL MAPA ES UNA COLECCIÓN DE CELDAS",12,weight="bold")
    ax = fig.add_axes([.025,.305,.595,.545],facecolor=BG)
    ax.imshow(overview,extent=extent,cmap=CMAP,vmin=0,vmax=1,interpolation="nearest")
    ax.set_axis_off()
    x,y = tr*(4,4)
    ax.scatter([x],[y],s=150,facecolor="none",edgecolor=TEAL,lw=2,zorder=4)
    ax.annotate("Detalle",(x,y),xytext=(x+120000,y+270000),fontsize=12,color=TEAL,
                arrowprops={"arrowstyle":"-","color":TEAL})
    # Barra métrica: unidades del CRS Albers; escala de cuadrícula, no RF fija.
    bx,by = bounds.left+180000,bounds.bottom+90000
    ax.plot([bx,bx+500000],[by,by],color=INK,lw=3)
    ax.text(bx+250000,by+45000,"500 km · cuadrícula Albers",ha="center",fontsize=10)
    cbax=fig.add_axes([.08,.304,.44,.017])
    cb=fig.colorbar(ScalarMappable(norm=plt.Normalize(0,1),cmap=CMAP),cax=cbax,orientation="horizontal",ticks=[0,.25,.5,.75,1])
    cb.ax.tick_params(labelsize=10); cb.outline.set_visible(False)
    caption(fig,.08,.265,"Índice sintético IIE  ·  paleta de visualización propuesta",11)

    caption(fig,.65,.867,"02  ACERCAMIENTO A LOS DATOS",12,weight="bold")
    caption(fig,.65,.832,"64 celdas reales · 250 × 250 m cada una",13)
    zoom=fig.add_axes([.65,.475,.305,.315])
    zoom.set_xlim(0,8);zoom.set_ylim(8,0);zoom.set_aspect("equal");zoom.axis("off")
    for r in range(8):
        for c in range(8):
            val=float(close[r,c]); color=CMAP(val)
            zoom.add_patch(Rectangle((c,r),1,1,facecolor=color,edgecolor=BG,lw=.6))
            luminance=.2126*color[0]+.7152*color[1]+.0722*color[2]
            zoom.text(c+.5,r+.5,f"{val:.2f}",ha="center",va="center",fontsize=10,
                      color="white" if luminance<.48 else INK)
    for r in range(8):
        for c in range(8):
            if c<7 and zclose[r,c]!=zclose[r,c+1]:zoom.plot([c+1,c+1],[r,r+1],color="#02e0db",lw=3)
            if r<7 and zclose[r,c]!=zclose[r+1,c]:zoom.plot([c,c+1],[r+1,r+1],color="#02e0db",lw=3)
    fig.add_artist(ConnectionPatch((x,y),(0,4),coordsA=ax.transData,coordsB=zoom.transData,
                                  color=TEAL,lw=1,linestyle="--",zorder=0))
    ids=sorted(np.unique(zclose).tolist())
    zoom.text(2.5,-.22,f"Clase {int(zclose[0,0])}",ha="center",fontsize=10,color=TEAL)
    zoom.text(6.5,-.22,f"Clase {int(zclose[0,-1])}",ha="center",fontsize=10,color=TEAL)
    caption(fig,.65,.453,f"Línea turquesa: cambio de clase Holdridge ({ids[0]} / {ids[1]}).",11,color=TEAL)
    caption(fig,.65,.430,"Números: IIE leído del GeoTIFF, redondeado a 2 decimales.",10,color=MUTED)

    caption(fig,.035,.220,"UNA CLASE PUEDE ABARCAR MUCHOS PÍXELES",11,weight="bold")
    hax=fig.add_axes([.03,.052,.27,.153]); hax.axis("off")
    hv=np.ma.masked_where(zone_view==0,np.zeros_like(zone_view))
    for k,code in enumerate(ids,1):hv[zone_view==code]=k
    hax.imshow(hv,extent=extent,cmap=ListedColormap(["#dde3dd",TEAL,"#ad682b"]),vmin=0,vmax=2,interpolation="nearest")
    hax.scatter([x],[y],s=18,facecolor="none",edgecolor=INK,lw=1)
    caption(fig,.315,.200,f"Clases {ids[0]} y {ids[1]} en el raster",12,weight="bold")
    caption(fig,.315,.170,f"{ids[0]}: turquesa · {ids[1]}: ocre\nGris: otras clases\nBlanco: sin datos",11,color=MUTED,linespacing=1.5)
    caption(fig,.315,.086,"Una clase puede estar fragmentada.\nHoldridge: celdas de ≈850 m.",10,color=MUTED)

    caption(fig,.65,.383,"03  QUÉ SE COMPARTE Y QUÉ CAMBIA",12,weight="bold")
    caption(fig,.65,.348,"θ  Parámetros fijos del modelo entrenado",14,weight="bold")
    # Plates de indexación, sin arcos probabilísticos ni afirmación de independencia.
    plate=fig.add_axes([.644,.107,.325,.218]);plate.set_xlim(0,1);plate.set_ylim(0,1);plate.axis("off")
    plate.add_patch(FancyBboxPatch((.015,.02),.97,.94,boxstyle="round,pad=0.008,rounding_size=.02",facecolor="#eef3ee",edgecolor=TEAL,lw=1.4))
    plate.text(.05,.88,"Clases j = 1,…,J",fontsize=12,weight="bold",va="top")
    plate.text(.05,.70,"Hⱼ: clase de Holdridge compartida",fontsize=12,color=TEAL)
    plate.add_patch(Rectangle((.05,.11),.90,.47,facecolor=BG,edgecolor=MUTED,lw=1))
    plate.text(.08,.49,"Píxeles de j: i = 1,…,nⱼ",fontsize=11,weight="bold")
    plate.text(.08,.33,"Xᵢⱼ: contexto (Hⱼ, bioclima, suelo…)",fontsize=10)
    plate.text(.08,.18,"Yᵢⱼ: detección (sensores remotos…)",fontsize=10)
    caption(fig,.65,.090,"Rectángulos = repetición; esquema de índices, no un DAG.\nCompartir clase no obliga a obtener el mismo IIE.",10,color=MUTED)
    caption(fig,.035,.035,"0–1 representa el índice sintético: no es un porcentaje determinista ni una probabilidad escalar pura.",12,weight="bold")
    caption(fig,.035,.012,"Fuentes: ie_2018_st_v2.tif y zvh-mx3qw-mexico-Albers.tif · Datos aportados por Miguel · Composición asistida por IA · P-ME-061",8,color=MUTED)
    fig.savefig(OUT/f"{STEM}.png",dpi=180,facecolor=BG)
    fig.savefig(OUT/f"{STEM}.svg",facecolor=BG,metadata={"Date":None})
    plt.close(fig)
    ET.parse(OUT/f"{STEM}.svg")
    for suffix in ("png","svg"):
        assert (OUT/f"{STEM}.{suffix}").stat().st_size < 5*1024*1024
    (OUT/f"{STEM}.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({"range":meta["IIE_full_scan"],"detail_classes":ids,"outputs":STEM,"verification":"64 clases cotejadas con muestreo directo; 64 valores nativos exactos; SVG válido; archivos <5 MiB"},ensure_ascii=False))


if __name__ == "__main__":
    main()
