"""Piloto de Lecturas. Ejecutar con Python 3.10+ y abrir el enlace impreso."""
import argparse
import json
import sqlite3
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
APP = ROOT / "blog" / "app"
SALTELLI = ("Bring digital twins back to Earth", "Andrea Saltelli et al. (2024). WIREs Climate Change, 15, e915.",
            "https://doi.org/10.1002/wcc.915", "Ficha de prueba",
            "¿Qué evidencia independiente necesitaríamos para sostener una inferencia sobre la condición ecológica?",
            "Resumen, p. 1. Los autores cuestionan que aumentar la sofisticación de los gemelos digitales de la Tierra baste para orientar decisiones climáticas. La pregunta sobre el IIE es una propuesta del taller.",)


def initialize(path):
    path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(path) as db:
        db.executescript("""
          CREATE TABLE IF NOT EXISTS reading(id INTEGER PRIMARY KEY, title TEXT, citation TEXT, url TEXT,
              author TEXT, question TEXT, excerpt TEXT);
          CREATE TABLE IF NOT EXISTS comment(id INTEGER PRIMARY KEY, reading_id INTEGER REFERENCES reading(id),
              author TEXT, body TEXT);
          CREATE TABLE IF NOT EXISTS agreement(reading_id INTEGER PRIMARY KEY REFERENCES reading(id),
              kind TEXT, plan TEXT, facilitator TEXT, day TEXT);
        """)
        db.execute("INSERT OR IGNORE INTO reading VALUES(1,?,?,?,?,?,?)", SALTELLI)


class Pilot(SimpleHTTPRequestHandler):
    def payload(self, status, data, mime="application/json"):
        if mime == "application/json":
            data = json.dumps(data, ensure_ascii=False)
        body = data.encode()
        self.send_response(status)
        self.send_header("Content-Type", mime + "; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = urlsplit(self.path).path
        if path == "/readings":
            with sqlite3.connect(self.server.database) as db:
                db.row_factory = sqlite3.Row
                db.execute("BEGIN")
                rows = [dict(row, comments=[], agreement=None) for row in db.execute("SELECT * FROM reading ORDER BY id DESC")]
                by_id = {row["id"]: row for row in rows}
                for item in db.execute("SELECT * FROM comment ORDER BY id"):
                    by_id[item["reading_id"]]["comments"].append(dict(item))
                for item in db.execute("SELECT * FROM agreement"):
                    by_id[item["reading_id"]]["agreement"] = dict(item)
            return self.payload(200, rows)
        if path in ("/", "/index.html"):
            html = (APP / "index.html").read_text(encoding="utf-8")
            html = html.replace('<button type="button" data-view="readings">Lecturas</button>', '')
            html = html.replace('</title>', ' · Piloto de lecturas</title>')
            html = html.replace('</head>', '<script type="module" src="lecturas.mjs"></script></head>')
            return self.payload(200, html, "text/html")
        if path == "/lecturas.mjs":
            return self.payload(200, (HERE / "lecturas.mjs").read_text(encoding="utf-8"), "application/javascript")
        if path == "/config.json":
            return self.payload(200, {})
        if path == "/sw.js":
            return self.send_error(404)
        # Serve only the public app shell, never a directory listing or project files.
        if path.count("/") != 1 or not (APP / path[1:]).is_file() or "\\" in path:
            return self.send_error(404)
        super().do_GET()

    def do_POST(self):
        origin = f"http://127.0.0.1:{self.server.server_port}"
        if self.headers.get("Origin") != origin or self.headers.get_content_type() != "application/json":
            return self.payload(403, "Solicitud fuera del piloto local.")
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 32768:
                raise ValueError("Tamaño del formulario no válido.")
            data = json.loads(self.rfile.read(size))
            if not isinstance(data, dict):
                raise ValueError("Formulario no válido.")

            def field(key, required=True):
                value = data.get(key, "")
                if not isinstance(value, str) or len(value) > 2000 or (required and not value.strip()):
                    raise ValueError("Revisa los campos de la ficha.")
                return value.strip()

            with sqlite3.connect(self.server.database) as db:
                db.execute("PRAGMA foreign_keys=ON")
                if self.path == "/readings":
                    url = field("url", False)
                    if url and (urlsplit(url).scheme not in ("http", "https") or not urlsplit(url).hostname):
                        raise ValueError("Usa un enlace http o https.")
                    db.execute("INSERT INTO reading(title,citation,url,author,question,excerpt) VALUES(?,?,?,?,?,?)",
                               (field("title"), field("citation"), url, field("author"), field("question"), field("excerpt", False)))
                elif self.path == "/comments":
                    db.execute("INSERT INTO comment(reading_id,author,body) VALUES(?,?,?)",
                               (int(field("id")), field("author"), field("body")))
                elif self.path == "/agreements":
                    from datetime import date
                    kind = field("kind")
                    if kind not in ("Discutir en sesión", "Integrar en una actividad", "Retomar después"):
                        raise ValueError("Selecciona el uso acordado.")
                    scheduled = kind != "Retomar después"
                    day = date.fromisoformat(field("day")).isoformat() if scheduled else ""
                    db.execute("INSERT INTO agreement VALUES(?,?,?,?,?)", (int(field("id")), kind, field("plan"),
                               field("facilitator", scheduled), day))
                else:
                    return self.payload(404, "Operación desconocida.")
            self.payload(201, "Guardado en el piloto.")
        except sqlite3.IntegrityError:
            self.payload(409, "La ficha cambió. Actualiza antes de continuar.")
        except (UnicodeError, ValueError) as error:
            self.payload(400, str(error))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--db", type=Path, default=ROOT / ".local" / "lecturas" / "piloto.sqlite")
    args = parser.parse_args()
    initialize(args.db)
    with ThreadingHTTPServer(("127.0.0.1", args.port), partial(Pilot, directory=str(APP))) as server:
        server.database = args.db
        print(f"http://127.0.0.1:{server.server_port}/#lecturas", flush=True)
        server.serve_forever()
