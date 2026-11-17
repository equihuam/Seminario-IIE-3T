"""Prepara una carpeta pública para desplegar el piloto por arrastre en Netlify."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen

SOURCE = Path(__file__).resolve().parents[1] / "blog" / "_site"
BLOG = "https://seminario-iie.netlify.app"
FILES = (
    "install.mjs agenda-notes.mjs api.mjs app.css app.mjs calendar.mjs config.json "
    "agenda.ics directiva-pwa.patch encuentros.json icon-192.png icon-512.png icon.svg "
    "index.html manifest.webmanifest model.mjs navigation.mjs session-card.mjs readings.mjs sw.js wizard.mjs"
).split()


def prepare(target):
    app = SOURCE / "app"
    config = json.loads((app / "config.json").read_text(encoding="utf-8-sig"))
    if set(config) != {"supabaseUrl", "publishableKey", "emailAccessReady"}:
        raise ValueError("Revisar los campos de la configuración pública")
    if not config["publishableKey"].startswith("sb_publishable_"):
        raise ValueError("Se requiere una clave publicable de Supabase")
    sessions = json.loads((app / "encuentros.json").read_text(encoding="utf-8-sig"))
    for session in sessions:
        if "presentation" in session:
            path = (app / session["presentation"]).resolve()
            if path.parent != SOURCE / "presentaciones" or path.suffix != ".pptx" or not path.is_file():
                raise ValueError("Presentación fuera de la colección publicada")
            url = f"{BLOG}/presentaciones/{quote(path.name)}"
            with urlopen(url, timeout=45) as remote, path.open("rb") as local:
                if hashlib.file_digest(remote, "sha256").digest() != hashlib.file_digest(local, "sha256").digest():
                    raise ValueError(f"La presentación publicada difiere de {path.name}")
            session["presentation"] = url
    if target.exists() and any(target.iterdir()):
        raise ValueError("El destino debe estar vacío para evitar publicar archivos ajenos")
    dest = target / "app"
    dest.mkdir(parents=True, exist_ok=True)
    for name in FILES:
        shutil.copyfile(app / name, dest / name)
    page = dest / "index.html"
    html = page.read_text(encoding="utf-8")
    html = html.replace('href="../index.html"', f'href="{BLOG}/"')
    html = html.replace('href="../semillero/index.html#registro-de-ideas"', f'href="{BLOG}/semillero/#registro-de-ideas"')
    page.write_text(html, encoding="utf-8")
    (dest / "encuentros.json").write_text(
        json.dumps(sessions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (target / "index.html").write_text(
        '<!doctype html><html lang="es"><meta charset="utf-8"><title>Tablero de Trabajo</title>'
        '<meta http-equiv="refresh" content="0;url=./app/">'
        '<a href="./app/">Abrir el Tablero de Trabajo</a></html>', encoding="utf-8")
    (target / "_headers").write_text(
        "/app/*.mjs\n  Content-Type: application/javascript; charset=utf-8\n"
        "/app/agenda.ics\n  Content-Type: text/calendar; charset=utf-8\n  Cache-Control: no-cache\n"
        "/app/sw.js\n  Cache-Control: no-cache\n", encoding="utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("destino", nargs="?", type=Path, default=Path("apps/_pwa-control-clase"))
    prepare(parser.parse_args().destino)
