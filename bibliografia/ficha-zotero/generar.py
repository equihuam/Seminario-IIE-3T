"""Genera una ficha A4 en SVG editable y PDF; ejecutar desde cualquier carpeta."""
from pathlib import Path
from html import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.colors import HexColor
import pdfplumber
import re

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output' / 'pdf'
OUT.mkdir(parents=True, exist_ok=True)
W, H = 595.276, 841.89
pdf = canvas.Canvas(str(OUT / 'zotero-ia-ficha.pdf'), pagesize=(W,H))
pdf.setTitle('Zotero + IA | Del hallazgo a la cita')
pdf.setAuthor('Seminario IIE-3T; propuesta de Miguel, desarrollo con asistencia de IA')
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="297mm" viewBox="0 0 {W} {H}">', '<title>Zotero + IA: del hallazgo a la cita</title>', '<desc>Ficha de siete casos de uso del rol bibliotecario, con encargos y comprobaciones.</desc>']
INK='#183D3A'; MUTED='#4B625F'; BG='#F7F6F0'; TEAL='#167A71'; GOLD='#B77828'
def rect(x,y,w,h,fill,r=0):
    pdf.setFillColor(HexColor(fill)); pdf.roundRect(x,H-y-h,w,h,r,stroke=0,fill=1)
    svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"/>')
def text(x,y,s,size=10,color=INK,bold=False):
    font='Helvetica-Bold' if bold else 'Helvetica'
    assert x+pdfmetrics.stringWidth(s,font,size)<W-15, s
    pdf.setFillColor(HexColor(color)); pdf.setFont(font,size); pdf.drawString(x,H-y,s)
    svg.append(f'<text x="{x}" y="{y}" font-family="Arial, Helvetica, sans-serif" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{escape(s)}</text>')
def para(x,y,s,width,size=10,leading=13,color=INK,bold=False):
    font='Helvetica-Bold' if bold else 'Helvetica'; line=''
    for word in s.split():
        trial=(line+' '+word).strip()
        if line and pdfmetrics.stringWidth(trial,font,size)>width:
            text(x,y,line,size,color,bold); y+=leading; line=word
        else: line=trial
    if line:text(x,y,line,size,color,bold);y+=leading
    return y

rect(0,0,W,H,BG)
rect(0,0,W,116,INK)
icon = ROOT / 'img' / 'identidad' / 'seminario-icono.svg'
icon_body = re.sub(r'<svg[^>]*>', '', icon.read_text(encoding='utf-8'), count=1).rsplit('</svg>',1)[0]
svg.append(f'<g transform="translate(468 14) scale({88/512})">{icon_body}</g>')
pdf.drawImage(str(ROOT / 'img' / 'identidad' / 'seminario-icono.png'),468,H-102,88,88,mask='auto')
text(30,28,'SEMINARIO IIE-3T  /  GUÍA DE BOLSILLO',9,'#B7DCD2',True)
text(30,63,'Zotero + IA',31,'#FFFFFF',True)
text(30,88,'Del hallazgo a la cita',17,'#FFFFFF')
text(30,105,'Siete tareas para trabajar con tu bibliotecario científico.',10,'#DCECE6')

text(30,139,'UN ENCARGO QUE PUEDES ADAPTAR',9,TEAL,True)
y=para(30,157,'Actúa como bibliotecario. En [biblioteca y colección], realiza [tarea] con [fuentes] y entrega [producto]. Comprueba tu acceso, declara qué consultaste y verifica los cambios guardados. Si hay ambigüedad, indícala.',535,11,15)
text(30,218,'ELIGE UNA TAREA · REVISA SU RESULTADO',9,TEAL,True)

cards=[
 ('Encontrar y registrar','Busca sobre [pregunta]; coteja e incorpora las fuentes seleccionadas, sin duplicados.','Obra, versión y colección correctas. La búsqueda externa precede al registro.'),
 ('Organizar y etiquetar','Propón etiquetas de tema y estado; aplica las acordadas.','Criterios consistentes. Metadatos verificados no significa texto leído.'),
 ('Leer y anotar','Recupera mis comentarios y resalta [pasaje] en [PDF] con [color].','Texto y página exactos; anotación visible en el lector tras sincronizar.'),
 ('Sintetizar fuentes','Compara estas obras sobre [pregunta]: argumentos, métodos y límites.','Cada afirmación tiene fuente. Distingue resumen consultado y texto completo.'),
 ('Citar al escribir','Propón fuentes consultadas que sustenten [párrafo] e incorpora las citas.','Respaldo del pasaje y localización. Clave Zotero y clave de cita son distintas.'),
 ('Generar bibliografías','Genera la bibliografía de [documento] en [estilo o formato].','Citas y lista coinciden. Comprueba autores, edición, DOI y claves exportadas.'),
]
for i,(title,ask,check) in enumerate(cards):
    x=30+(i%2)*275; y=230+(i//2)*119
    rect(x,y,260,109,'#FFFFFF',7)
    rect(x+12,y+12,23,23,TEAL,5)
    text(x+18,y+28,str(i+1),11,'#FFFFFF',True)
    text(x+44,y+27,title,12,INK,True)
    q=para(x+12,y+49,ask,236,10,12)
    q=para(x+12,q+4,'Comprueba: '+check,236,9.4,11.5,MUTED)
    assert q<=y+110,(title,q)

rect(30,590,535,102,'#E5EFE8',7)
rect(42,602,23,23,GOLD,5)
text(48,618,'7',11,'#FFFFFF',True)
text(74,618,'Revisar y mantener la biblioteca',13,INK,True)
para(42,640,'Contrasta adjuntos con metadatos: título, autores, DOI, versión y función del anexo. Revisa también enlaces y claves entre Zotero y mis documentos; propone correcciones.',507,10,13)
para(42,674,'Comprueba: un enlace válido puede llevar al PDF equivocado. Conserva la correspondencia entre claves anteriores y actuales; no decidas solo por el nombre del archivo.',507,9.4,11.5,MUTED)

text(30,713,'ANTES DE EMPEZAR',9,TEAL,True)
para(30,729,'La API conecta herramientas con Zotero. Verifica versión, acceso local o web y permisos según la tarea; un chat no accede por sí solo a tu biblioteca.',535,9.5,12)
para(30,759,'Ensayado en el seminario: consulta, registro y anotaciones por API web. Síntesis y citas requieren revisión; el flujo depende del editor y las herramientas disponibles.',535,9,11.5,MUTED)
text(30,798,'Guía y fuentes: bibliografia/ficha-zotero/README.md',8,MUTED)
text(30,814,'Propuesta de Miguel · Desarrollo con IA · 10 oct 2026 · v1.1',8,MUTED)
text(498,814,'1 / 1',8,MUTED)
pdf.showPage();pdf.save();svg.append('</svg>')
(Path(__file__).parent/'zotero-ia-ficha.svg').write_text('\n'.join(svg),encoding='utf-8')
with pdfplumber.open(OUT/'zotero-ia-ficha.pdf') as doc:
    assert len(doc.pages)==1
    page=doc.pages[0]
    assert all(0<=c['x0']<c['x1']<=W and 0<=c['top']<c['bottom']<=H for c in page.chars)
    page.to_image(resolution=140).save(OUT/'zotero-ia-ficha.png')
print('SVG, PDF de una página y PNG generados; texto dentro de los límites de página.')
