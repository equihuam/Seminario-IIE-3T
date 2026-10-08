"""Check the actual Git index, including force-added files, before committing."""
from pathlib import Path, PurePosixPath
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
MAX_BYTES = 5 * 1024 * 1024
BLOCKED_PARTS = {".venv", ".local", "private", "confidential", "_site", "_freeze", ".quarto", "__pycache__"}
BLOCKED_SUFFIXES = {".ppt", ".pptx", ".rds", ".rda", ".parquet", ".feather", ".tif", ".tiff", ".gpkg", ".sqlite", ".zip", ".7z", ".mp4", ".mov", ".pem", ".key", ".p12", ".pfx"}
SECRET_PATTERNS = [
    rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
    rb"\bgh[pousr]_[A-Za-z0-9]{30,}\b",
    rb"\bAKIA[0-9A-Z]{16}\b",
    rb"\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b",
]


def issues(name, content):
    p = PurePosixPath(name.lower())
    errors = []
    if (BLOCKED_PARTS.intersection(p.parts) or p.suffix in BLOCKED_SUFFIXES
            or p.name in {"prompts.md", ".renviron", ".rhistory", ".rdata"}
            or p.name == ".env" or (p.name.startswith(".env.") and p.name != ".env.example")
            or "credentials" in p.name or "secret" in p.name or ".local." in p.name
            or str(p).startswith(("data/raw/", "data/original/", "data/private/", "renv/library/", "renv/cache/", "renv/sandbox/", "renv/staging/", "site/img/"))):
        errors.append("archivo excluido por la política del proyecto")
    if len(content) > MAX_BYTES:
        errors.append("supera el límite de 5 MiB")
    if any(re.search(pattern, content) for pattern in SECRET_PATTERNS):
        errors.append("posible credencial; revisar sin imprimir su contenido")
    return errors


def check_index(root=ROOT):
    entries = subprocess.check_output(["git", "ls-files", "--stage", "-z"], cwd=root).split(b"\0")
    failures = []
    count = 0
    for entry in filter(None, entries):
        meta, name_raw = entry.split(b"\t", 1)
        mode, oid, stage = meta.split()
        name = name_raw.decode("utf-8")
        count += 1
        if mode in (b"120000", b"160000") or stage != b"0":
            failures.append(f"{name}: enlace, submódulo o conflicto no admitido")
            continue
        size = int(subprocess.check_output(["git", "cat-file", "-s", oid.decode()], cwd=root))
        if size > MAX_BYTES:
            failures.append(f"{name}: supera el límite de 5 MiB")
            continue
        content = subprocess.check_output(["git", "cat-file", "blob", oid.decode()], cwd=root)
        failures.extend(f"{name}: {error}" for error in issues(name, content))
    if not count:
        failures.append("el índice no contiene archivos")
    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1
    print(f"Índice revisado: {count} archivos; tamaño y patrones conocidos correctos.")
    return 0


if __name__ == "__main__":
    raise SystemExit(check_index())
