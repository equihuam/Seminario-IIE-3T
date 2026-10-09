"""Check generated local links, publication boundaries and known secret patterns."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
from check_repo import issues

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "blog" / "_site"
EXPECTED = {"index.html", "empieza-aqui.html", "sesiones.html", "temas.html", "reproducibilidad.html",
            "posts/01-tres-capas/index.html", "recursos/comprobacion-python.html", "recursos/comprobacion-r.html",
            "recursos/cambio-climatico.html"}
EXPECTED.update({"semillero/index.html", "semillero/plantilla.html",
                 "semillero/I001-socioecosistema.html", "semillero/I002-gestion.html",
                 "semillero/I003-salud.html", "semillero/I004-independencia.html",
                 "exploraciones/index.html", "exploraciones/plantilla.html"})
PUBLIC_SOURCES = {"recursos/clima-modelo.R"}


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.targets = []

    def handle_starttag(self, tag, attrs):
        self.targets.extend(v for k, v in attrs if k in ("href", "src") and v)


def main():
    errors = []
    for name in EXPECTED:
        if not (OUTPUT / name).is_file():
            errors.append(f"Falta página: {name}")
    for path in OUTPUT.rglob("*"):
        if not path.is_file():
            continue
        name = path.relative_to(OUTPUT).as_posix()
        content = path.read_bytes()
        # Output legitimately contains site libraries, but no private source material.
        errors.extend(f"{name}: {e}" for e in issues(name, content))
        if path.suffix.lower() in (".md", ".qmd", ".r", ".py", ".lock") and name not in PUBLIC_SOURCES:
            errors.append(f"Fuente interna inesperada: {name}")
        if path.suffix in (".html", ".json", ".csv", ".svg"):
            text = content.decode("utf-8", errors="replace")
            if re.search(r"[A-Za-z]:[\\/]Users[\\/]|PROMPTS\.md|BITACORA\.md|tools\.local\.json", text, re.I):
                errors.append(f"Referencia interna en publicación: {name}")
        if path.suffix != ".html":
            continue
        parser = Links()
        parser.feed(content.decode("utf-8"))
        for link in parser.targets:
            url = urlsplit(link)
            if url.scheme or url.netloc or not url.path:
                continue
            target = (OUTPUT / unquote(url.path).lstrip("/")) if url.path.startswith("/") else path.parent / unquote(url.path)
            target = target.resolve()
            if not target.is_relative_to(OUTPUT.resolve()) or not target.exists():
                errors.append(f"{name}: enlace local no válido {link}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Sitio verificado: {len(EXPECTED)} páginas esperadas, enlaces locales y límites de publicación.")


if __name__ == "__main__":
    main()
