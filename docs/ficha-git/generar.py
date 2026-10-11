"""Genera la ficha interna Git + IA en carta; no escribe en blog/."""
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
W, H = 612, 792
INK, TEAL, MUTED = '#183D3A', '#167A71', '#4B625F'
pdf = canvas.Canvas(str(OUT / 'git-ia-ficha.pdf'), pagesize=(W, H))
pdf.setTitle('Git + IA: reglas y procedimiento de colaboración')
pdf.setAuthor('Propuesta de Miguel; desarrollo con asistencia de IA')
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="8.5in" height="11in" viewBox="0 0 {W} {H}">', '<title>Git + IA: colaboración de Miguel y Octavio</title>', '<desc>Seis encargos con comprobaciones y reglas de conservación del trabajo compartido.</desc>']


def rect(x, y, w, h, fill, r=0):
    pdf.setFillColor(HexColor(fill))
    pdf.roundRect(x, H-y-h, w, h, r, stroke=0, fill=1)
    svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"/>')


ENGLISH = re.compile(r'\b(main|commit|push|PR|merge|diff|blog|worktrees|branch|prune|feature|prompts)\b', re.IGNORECASE)


def runs(s, bold=False):
    for token in re.split(r'(→|\b\w+\b)', s):
        italic = bool(ENGLISH.fullmatch(token))
        font = ('Helvetica-BoldOblique' if italic else 'Helvetica-Bold') if bold else ('Helvetica-Oblique' if italic else 'Helvetica')
        yield token, font, italic


def width_of(s, size, bold=False):
    return sum(size*1.3 if token == '→' else pdfmetrics.stringWidth(token, font, size) for token, font, _ in runs(s, bold))


def text(x, y, s, size=10, color=INK, bold=False):
    assert x + width_of(s, size, bold) <= W-24, s
    pdf.setFillColor(HexColor(color))
    for token, font, italic in runs(s, bold):
        if token == '→':
            # Vector arrow: independent of font glyph coverage in PDF and SVG.
            a, b, cy = x+1, x+size*1.2, y-size*.3
            pdf.setStrokeColor(HexColor(color))
            pdf.setLineWidth(.8)
            pdf.line(a,H-cy,b,H-cy)
            pdf.line(b-3,H-cy+3,b,H-cy)
            pdf.line(b-3,H-cy-3,b,H-cy)
            svg.append(f'<path d="M {a} {cy} H {b} M {b-3} {cy-3} L {b} {cy} L {b-3} {cy+3}" fill="none" stroke="{color}" stroke-width="0.8"/>')
            x += size*1.3
        elif token:
            pdf.setFont(font, size)
            pdf.drawString(x, H-y, token)
            svg.append(f'<text x="{x}" y="{y}" font-family="Arial, Helvetica, sans-serif" font-size="{size}" font-weight="{700 if bold else 400}" font-style="{"italic" if italic else "normal"}" fill="{color}">{escape(token)}</text>')
            x += pdfmetrics.stringWidth(token, font, size)


def para(x, y, s, width, size=10, leading=13, color=INK):
    line = ''
    for word in s.split():
        trial = (line+' '+word).strip()
        if line and width_of(trial, size) > width:
            text(x, y, line, size, color)
            y += leading
            line = word
        else:
            line = trial
    if line:
        text(x, y, line, size, color)
        y += leading
    return y


rect(0, 0, W, H, '#F7F6F0')
rect(0, 0, W, 104, INK)
icon = ROOT / 'img' / 'identidad' / 'seminario-icono.svg'
icon_body = re.sub(r'<svg[^>]*>', '', icon.read_text(encoding='utf-8'), count=1).rsplit('</svg>', 1)[0]
svg.append(f'<g transform="translate(500 12) scale({80/512})">{icon_body}</g>')
pdf.drawImage(str(icon.with_suffix('.png')), 500, H-92, 80, 80, mask='auto')
text(30, 25, 'SEMINARIO IIE-3T / REFERENCIA PARA MIGUEL Y OCTAVIO', 9, '#B7DCD2', True)
text(30, 58, 'Git + IA', 31, '#FFFFFF', True)
text(30, 82, 'Reglas y procedimiento de colaboración', 16, '#FFFFFF')
text(30, 126, 'EL RECORRIDO', 9, TEAL, True)
end = para(30, 142, 'Cualquier cambio inicia con una copia de main a una rama de trabajo nueva. Así, el recorrido usual es:', 552, 10.5, 13)
assert end <= 170
end = para(30, 178, 'main vigente → nueva rama propia → cambios y pruebas → commit → push → PR a main → revisión y acuerdo → merge aprobado a main → comprobación y limpieza → main vigente', 552, 11, 13)
assert end <= 218
text(30, 211, 'PIDE UNA ACCIÓN Y COMPRUEBA SU RESULTADO', 9, TEAL, True)
cards = [
    ('1. Empezar o retomar', 'Revisa estado y trabajo pendiente. Para [objetivo], crea [autor/tema] desde main actualizado; si retomamos, inspecciona la rama existente.', 'Rama y base correctas; cambios ajenos conservados.'),
    ('2. Preparar y verificar', 'Implementa [cambio]. Revisa el diff, ejecuta las pruebas pertinentes y registra resultados. Si cambia el blog, regenera y verifica su salida.', 'Evidencia real de pruebas; archivos dentro del alcance.'),
    ('3. Guardar y proponer', 'Haz commit y push de los archivos revisados. Comprueba el índice y abre un PR con base main. No lo fusiones todavía.', 'Commit, rama remota y enlace al PR; sin archivos ajenos.'),
    ('4. Revisar al otro', 'Revisa el PR [número] sin editar: base, diferencias, pruebas y conflictos. Separa problemas que impiden integración de sugerencias.', 'Hallazgos con ubicación; límites de lo verificado.'),
    ('5. Resolver un conflicto', 'Compara ambas aportaciones y propón una combinación. Conserva su intención; consulta decisiones incompatibles y vuelve a verificar.', 'Sin descartes automáticos ni push forzado.'),
    ('6. Integrar y cerrar', 'Integra el PR acordado en main. Si cambia el blog, comprueba publicación. Actualiza main y limpia solo ramas integradas sin trabajo pendiente.', 'Revisar PR y worktrees antes de borrar; branch -d y prune.'),
]
for i, (title, ask, check) in enumerate(cards):
    x, y = 30+(i % 2)*284, 220+(i // 2)*126
    rect(x, y, 268, 124, '#FFFFFF', 7)
    text(x+12, y+23, title, 12, INK, True)
    end = para(x+12, y+42, ask, 244, 10, 12.5)
    end = para(x+12, end+5, 'Comprueba: '+check, 244, 9.4, 11.5, MUTED)
    assert end <= y+125, (title, end)
rect(30, 604, 552, 81, '#E5EFE8', 7)
text(42, 624, 'REGLAS QUE CUIDAN NUESTRO TRABAJO CONJUNTO', 9, TEAL, True)
end = para(42, 641, 'main estable; ramas miguel/tema, octavio/tema o feature/tema. Seleccionar archivos antes del commit; revisar el índice con scripts/check_repo.py. Registrar prompts por autor, bitácora y estado. Conservar cambios ajenos y excluir credenciales y datos restringidos.', 528, 10, 12.5)
assert end <= 686
text(30, 703, 'COMMIT guarda localmente. PUSH comparte. PR propone. MERGE integra.', 10, INK, True)
end = para(30, 720, 'La integración en main puede publicar el blog: Te corresponde comprobar Netlify cuando sea el caso. La IA ejecuta exclusivamente lo autorizado; no tiene permiso de fusionar nada al recibir un encargo de edición. El único camino a main es mediante un PR.', 552, 9.5, 12)
assert end <= 756
text(30, 765, 'Guía ampliada: docs/COLABORACION-GIT-IA.md | Material fuera del blog', 8.5, MUTED)
text(30, 779, 'Propuesta de Miguel / Desarrollo con IA / 10 oct 2026 / v1.2', 8, MUTED)
text(550, 779, '1 / 1', 8, MUTED)
pdf.showPage()
pdf.save()
svg.append('</svg>')
(Path(__file__).parent / 'git-ia-ficha.svg').write_text('\n'.join(svg), encoding='utf-8')
with pdfplumber.open(OUT / 'git-ia-ficha.pdf') as doc:
    assert len(doc.pages) == 1
    page = doc.pages[0]
    assert (page.width, page.height) == (W, H)
    assert all(24 <= c['x0'] < c['x1'] <= W-24 and 0 <= c['top'] < c['bottom'] <= H-10 for c in page.chars)
    page.to_image(resolution=140).save(OUT / 'git-ia-ficha.png')
print('Ficha SVG/PDF/PNG generada: una página carta, texto dentro de márgenes; sin copias al blog.')
