"""Verificador de la presentación v4 del Seminario IIE-3T."""
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PPTX = ROOT / (sys.argv[1] if len(sys.argv) > 1 else "output/Introduccion-iie3t-redes-bayesianas-v4.pptx")
NS = {
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main"
}

if not PPTX.exists():
    print(f"Error: No existe el archivo {PPTX}", file=sys.stderr)
    sys.exit(1)

with ZipFile(PPTX) as z:
    slide_names = sorted(
        (n for n in z.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", n)),
        key=lambda n: int(re.search(r"(\d+)\.xml", n)[1])
    )
    assert len(slide_names) == 14, f"Se esperaban 14 diapositivas, se encontraron {len(slide_names)}"

    pictures = 0
    native_shapes = 0
    tables = 0

    for idx, sname in enumerate(slide_names, start=1):
        root = ET.fromstring(z.read(sname))
        pics = root.findall(".//p:pic", NS)
        pictures += len(pics)
        shapes = root.findall(".//p:sp", NS)
        native_shapes += len(shapes)
        tbls = root.findall(".//a:tbl", NS)
        tables += len(tbls)

        # Verificar imágenes esperadas en diapositivas específicas
        if idx in (1, 3, 10, 12):
            assert len(pics) >= 1, f"La diapositiva {idx} debe contener una imagen ilustrativa"

    # Verificar tabla nativa en diapositiva 7
    s7_root = ET.fromstring(z.read(slide_names[6]))
    s7_tbls = s7_root.findall(".//a:tbl", NS)
    assert len(s7_tbls) == 1, "La diapositiva 7 debe contener la tabla CPT nativa"

    tbl = s7_tbls[0]
    rows = tbl.findall("a:tr", NS)
    assert len(rows) == 5, f"La tabla CPT debe tener 5 filas, tiene {len(rows)}"

    # Verificar que las probabilidades sumen 1
    for row in rows[1:]:
        cells = row.findall("a:tc", NS)
        p_densa = float("".join(cells[2].itertext()).strip())
        p_rala = float("".join(cells[3].itertext()).strip())
        assert abs((p_densa + p_rala) - 1.0) < 1e-6, f"Fila no suma 1.0: {p_densa} + {p_rala}"

    # Verificar notas del presentador
    notes_count = len([n for n in z.namelist() if re.fullmatch(r"ppt/notesSlides/notesSlide\d+\.xml", n)])
    assert notes_count >= 14, f"Se esperaban al menos 14 notas de diapositiva, se encontraron {notes_count}"

    # Verificar notas de comprobación en slide 14
    s14_note_name = f"ppt/notesSlides/notesSlide14.xml"
    if s14_note_name in z.namelist():
        note_text = "".join(ET.fromstring(z.read(s14_note_name)).itertext())
        assert "Respuestas esperadas" in note_text or "Pregunta" in note_text

    report = {
        "slides": len(slide_names),
        "pictures": pictures,
        "native_shapes": native_shapes,
        "tables": tables,
        "cpt_sums_normalized": True,
        "speaker_notes_present": notes_count,
        "status": "VALIDADO OK"
    }
    print(json.dumps(report, indent=2, ensure_ascii=False))

