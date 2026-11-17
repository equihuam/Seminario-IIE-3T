"""Check the actual Git index, including force-added files, before committing."""
from pathlib import Path, PurePosixPath
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
MAX_BYTES = 5 * 1024 * 1024
MAX_PRESENTATION_BYTES = 20 * 1024 * 1024
BLOCKED_PARTS = {".venv", ".local", ".secrets", "private", "confidential", "_site", "_freeze", ".quarto", "__pycache__"}
BLOCKED_SUFFIXES = {".ppt", ".pptx", ".rds", ".rda", ".parquet", ".feather", ".tif", ".tiff", ".gpkg", ".sqlite", ".zip", ".7z", ".mp4", ".mov", ".pem", ".key", ".p12", ".pfx"}
SECRET_PATTERNS = [
    rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
    rb"\bgh[pousr]_[A-Za-z0-9]{30,}\b",
    rb"\bAKIA[0-9A-Z]{16}\b",
    rb"\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b",
]

# Explicitly preserved branch history has its own namespace (see its preamble).
PROMPT_ARCHIVES = {"prompts/miguel-mapa-iie-pixeles.md"}


def prompt_identifiers(name, content):
    """Return real Markdown entry headings, ignoring comments and code samples."""
    if not (name.startswith("prompts/") and name.endswith(".md")):
        return []
    text = content.decode("utf-8-sig")
    text = re.sub(r"<!--.*?(?:-->|\Z)",
                  lambda m: "\n" * m.group().count("\n"), text, flags=re.S)
    entries = []
    fence = None
    for number, line in enumerate(text.splitlines(), 1):
        marker = re.match(r"^ {0,3}(`{3,}|~{3,})(.*)$", line)
        if marker:
            token, rest = marker.groups()
            if fence is None:
                fence = token
            elif token[0] == fence[0] and len(token) >= len(fence) and not rest.strip():
                fence = None
            continue
        if fence is None:
            heading = re.match(r"^ {0,3}#{1,6}\s+(P(?:-ME-|-OE-)?\d+)\b", line)
            if heading:
                entries.append((heading.group(1), number))
    return entries


def is_approved_presentation(p, in_index=False):
    if p.suffix != ".pptx":
        return False
    if in_index:
        return (p.parts[:2] == ("blog", "presentaciones") or
                p.parts[:3] == ("blog", "_site", "presentaciones"))
    return (p.parts[:2] == ("blog", "presentaciones") or
            p.parts[:3] == ("blog", "_site", "presentaciones") or
            p.parts[:1] == ("presentaciones",))


def issues(name, content, in_index=False):
    p = PurePosixPath(name.lower())
    errors = []
    # Only the designated public output may contain the _site component.
    policy_parts = p.parts[2:] if p.parts[:2] == ("blog", "_site") else p.parts
    approved_pres = is_approved_presentation(p, in_index=in_index)
    effective_blocked = BLOCKED_SUFFIXES - {".pptx"} if approved_pres else BLOCKED_SUFFIXES
    max_bytes = MAX_PRESENTATION_BYTES if approved_pres else MAX_BYTES
    if (BLOCKED_PARTS.intersection(policy_parts) or p.suffix in effective_blocked
            or p.name in {".renviron", ".rhistory", ".rdata"}
            or p.name == ".env" or (p.name.startswith(".env.") and p.name != ".env.example")
            or "credentials" in p.name or "secret" in p.name or ".local." in p.name
            or str(p).startswith(("data/raw/", "data/original/", "data/private/", "renv/library/", "renv/cache/", "renv/sandbox/", "renv/staging/"))):
        errors.append("archivo excluido por la política del proyecto")
    if len(content) > max_bytes:
        errors.append(f"supera el límite de {max_bytes // (1024 * 1024)} MiB")
    if any(re.search(pattern, content) for pattern in SECRET_PATTERNS):
        errors.append("posible credencial; revisar sin imprimir su contenido")
    return errors


def check_index(root=ROOT):
    entries = subprocess.check_output(["git", "ls-files", "--stage", "-z"], cwd=root).split(b"\0")
    failures = []
    count = 0
    prompt_locations = {}
    for entry in filter(None, entries):
        meta, name_raw = entry.split(b"\t", 1)
        mode, oid, stage = meta.split()
        name = name_raw.decode("utf-8")
        count += 1
        if mode in (b"120000", b"160000") or stage != b"0":
            failures.append(f"{name}: enlace, submódulo o conflicto no admitido")
            continue
        p = PurePosixPath(name.lower())
        approved_pres = is_approved_presentation(p, in_index=True)
        max_bytes = MAX_PRESENTATION_BYTES if approved_pres else MAX_BYTES
        size = int(subprocess.check_output(["git", "cat-file", "-s", oid.decode()], cwd=root))
        if size > max_bytes:
            failures.append(f"{name}: supera el límite de {max_bytes // (1024 * 1024)} MiB")
            continue
        content = subprocess.check_output(["git", "cat-file", "blob", oid.decode()], cwd=root)
        failures.extend(f"{name}: {error}" for error in issues(name, content, in_index=True))
        try:
            identifiers = prompt_identifiers(name, content)
        except UnicodeDecodeError:
            failures.append(f"{name}: registro de prompts debe estar en UTF-8")
            continue
        scope = name if name in PROMPT_ARCHIVES else "canonical"
        for identifier, line in identifiers:
            key = (scope, identifier)
            location = f"{name}:{line}"
            if key in prompt_locations:
                failures.append(f"{location}: identificador duplicado {identifier}; "
                                f"primera aparición en {prompt_locations[key]}")
            else:
                prompt_locations[key] = location
    if not count:
        failures.append("el índice no contiene archivos")
    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1
    print(f"Índice revisado: {count} archivos; tamaño, patrones conocidos "
          "e identificadores de prompts correctos.")
    return 0


if __name__ == "__main__":
    raise SystemExit(check_index())
