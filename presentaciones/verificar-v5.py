"""Verificación estructural y numérica de v5; no sustituye revisión visual."""
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PPTX = ROOT / (sys.argv[1] if len(sys.argv) > 1 else
               "output/Introduccion-iie3t-redes-bayesianas-v5.pptx")
NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main",
      "a": "http://schemas.openxmlformats.org/drawingml/2006/main"}


def cell_text(cell):
    return "".join(t.text or "" for t in cell.findall(".//a:t", NS))


with ZipFile(PPTX) as archive:
    names = sorted((n for n in archive.namelist()
                    if re.fullmatch(r"ppt/slides/slide\d+\.xml", n)),
                   key=lambda n: int(re.search(r"(\d+)\.xml", n)[1]))
    assert len(names) == 16
    count_connectors = count_dashed = count_tables = count_pictures = 0
    for number, name in enumerate(names, 1):
        root = ET.fromstring(archive.read(name))
        shape_ids = {e.get("id") for e in root.findall(".//p:cNvPr", NS)}
        pics = root.findall(".//p:pic", NS)
        assert len(pics) == (1 if number in (1, 5, 11, 13) else 0)
        count_pictures += len(pics)
        count_tables += len(root.findall(".//a:tbl", NS))
        dashed_here = 0
        for connector in root.findall(".//p:cxnSp", NS):
            count_connectors += 1
            for endpoint in ("stCxn", "endCxn"):
                e = connector.find(f".//a:{endpoint}", NS)
                assert e is not None and e.get("id") in shape_ids
            tail = connector.find(".//a:tailEnd", NS)
            assert tail is not None and tail.get("type") == "triangle"
            dash = connector.find(".//a:prstDash", NS)
            if dash is not None and dash.get("val") not in (None, "solid"):
                count_dashed += 1
                dashed_here += 1
        assert dashed_here == (1 if number in (6, 10, 12) else 0)
        note = ET.fromstring(archive.read(f"ppt/notesSlides/notesSlide{number}.xml"))
        assert len(cell_text(note)) > 100
        if number in (6, 10, 12):
            assert "incertidumbre estructural" in cell_text(note)

    assert count_connectors == 13
    assert count_dashed == 3 and count_tables == 3 and count_pictures == 4
    rows = {}
    for number in (7, 8):
        root = ET.fromstring(archive.read(names[number - 1]))
        tbl = root.find(".//a:tbl", NS)
        rows[number] = [[cell_text(c) for c in row.findall("a:tc", NS)]
                        for row in tbl.findall("a:tr", NS)]
    likelihood = [list(map(float, row[1:])) for row in rows[7][1:]]
    prior = [float(row[1]) for row in rows[8][1:]]
    posterior = [float(row[2]) for row in rows[8][1:]]
    assert all(abs(sum(row) - 1) < 1e-12 for row in likelihood)
    assert abs(sum(prior) - 1) < 1e-12
    assert abs(sum(posterior) - 1) < 1e-12
    weights = [p * conditional[0] for p, conditional in zip(prior, likelihood)]
    computed = [w / sum(weights) for w in weights]
    assert all(abs(a - b) < 1e-12 for a, b in zip(computed, posterior))
    media_hashes = {hashlib.sha256(archive.read(n)).hexdigest()
                    for n in archive.namelist() if n.startswith("ppt/media/")}
    for asset in ("presentaciones/img/portada_integridad_redes_es.jpg",
                  "img/Mapa_México_Página_3.png", "presentaciones/img/sistemico_pecera_microcosmos_es.jpg", "presentaciones/img/bosque-suelo-transicion-v5.png"):
        assert hashlib.sha256((ROOT / asset).read_bytes()).hexdigest() in media_hashes
    closing = ET.fromstring(archive.read("ppt/notesSlides/notesSlide15.xml"))
    assert "Respuestas esperadas" in cell_text(closing)

print(json.dumps({"slides": 16, "attached_connectors": count_connectors,
                  "dashed_connectors": count_dashed, "native_tables": count_tables,
                  "original_images_preserved": True, "bayes_from_tables": computed,
                  "speaker_notes": 16, "status": "pass"}, ensure_ascii=False))
