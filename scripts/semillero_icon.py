"""Rasterize the app's editable geometric icon for PWA installation (Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]


def curve(points):
    a, b, c, d = points
    return [((1-t)**3*a[0]+3*(1-t)**2*t*b[0]+3*(1-t)*t*t*c[0]+t**3*d[0],
             (1-t)**3*a[1]+3*(1-t)**2*t*b[1]+3*(1-t)*t*t*c[1]+t**3*d[1])
            for t in [i/80 for i in range(81)]]


def main():
    scale = 4
    image = Image.new("RGB", (192*scale, 192*scale), "#184c42")
    draw = ImageDraw.Draw(image)
    paths = [[(96,151),(96,82)],
             curve([(96,111),(39,112),(42,60),(42,60)]) + curve([(42,60),(42,60),(96,55),(96,111)]),
             curve([(96,89),(96,40),(150,41),(150,41)]) + curve([(150,41),(150,41),(157,88),(96,89)])]
    for path in paths:
        draw.line([(round(x*scale),round(y*scale)) for x,y in path], fill="#e7d9a8", width=12*scale, joint="curve")
    for size in (192,512):
        image.resize((size,size),Image.Resampling.LANCZOS).save(ROOT / "blog" / "app" / f"icon-{size}.png")


if __name__ == "__main__":
    main()
