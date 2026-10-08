"""Check the delivered introduction deck's editable content and diagram arrows."""
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PPTX = ROOT / (sys.argv[1] if len(sys.argv) > 1 else "output/Introduccion-iie3t-redes-bayesianas-v3.pptx")
NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main",
      "a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
with ZipFile(PPTX) as z:
    slides = sorted((n for n in z.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", n)),
                    key=lambda n: int(re.search(r"(\d+)\.xml", n)[1]))
    v3 = "-v3" in PPTX.name
    assert len(slides) == (12 if v3 else 10)
    pictures = 0
    native_shapes = connectors = tables = dashed = 0
    for n in slides:
        root = ET.fromstring(z.read(n))
        pics = root.findall(".//p:pic", NS)
        pictures += len(pics)
        assert not pics or (v3 and n == "ppt/slides/slide10.xml"), "Unexpected raster image"
        native_shapes += len(root.findall(".//p:sp", NS))
        tables += len(root.findall(".//a:tbl", NS))
        for c in root.findall(".//p:cxnSp", NS):
            connectors += 1
            dash = c.find(".//a:prstDash", NS)
            if dash is not None and dash.get("val") not in (None, "solid"):
                dashed += 1
            tail = c.find(".//a:tailEnd", NS)
            head = c.find(".//a:headEnd", NS)
            assert tail is not None and tail.get("type") == "triangle"
            assert head is None or head.get("type") == "none"
            assert c.find(".//a:stCxn", NS) is not None
            assert c.find(".//a:endCxn", NS) is not None
    assert connectors == (24 if v3 else 20), connectors
    assert pictures == (1 if v3 else 0)
    if v3:
        assert dashed == 6
        s11 = ET.fromstring(z.read(slides[10]))
        text11 = "".join(s11.itertext())
        assert "Holdridge" in text11 and "independencia espacial" in text11
    assert tables == 2, tables
    if "-v2" in PPTX.name:
        assert dashed == 5, dashed
        for number in (3, 7, 8):
            note = ET.fromstring(z.read(f"ppt/notesSlides/notesSlide{number}.xml"))
            text = "".join(note.itertext())
            assert "Fuente:" in text and "no una solución definitiva" in text
    s5 = ET.fromstring(z.read(slides[4]))
    vals = []
    for table in s5.findall(".//a:tbl", NS):
        rows = [["".join(cell.itertext()) for cell in row.findall("a:tc", NS)]
                for row in table.findall("a:tr", NS)]
        vals.append(rows)
    assert abs(sum(float(r[1]) for r in vals[0][1:]) - 1) < 1e-12
    assert all(abs(sum(map(float, r[1:])) - 1) < 1e-12 for r in vals[1][1:])
    notes = ET.fromstring(z.read(f"ppt/notesSlides/notesSlide{12 if v3 else 10}.xml"))
    assert "Respuesta esperada" in "".join(notes.itertext())
    report = {"slides": len(slides), "native_shapes": native_shapes,
              "attached_connectors": connectors, "dashed_connectors": dashed, "native_tables": tables,
              "pictures": pictures, "probability_sums": "pass", "answer_in_notes": True}
    print(json.dumps(report, ensure_ascii=False))
