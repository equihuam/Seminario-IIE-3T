"""Build/preview only the public Quarto tree, using project-local environments."""
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import textwrap
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "blog"


def tools():
    config_path = ROOT / "tools.local.json"
    config = json.loads(config_path.read_text(encoding="utf-8-sig")) if config_path.exists() else {}
    result = {}
    for name, env in (("quarto", "QUARTO_PATH"), ("rscript", "RSCRIPT_PATH")):
        value = os.environ.get(env) or config.get(name) or shutil.which(name)
        if not value or not Path(value).is_file():
            raise SystemExit(f"No se encuentra {name}. Configure {env} o tools.local.json.")
        # Preserve Windows short paths: some bundled launchers cannot quote spaces.
        result[name] = os.path.abspath(value)
    return result


def environment(config):
    py = ROOT / ".venv" / ("Scripts/python.exe" if os.name == "nt" else "bin/python")
    if not py.is_file() or not (ROOT / "renv.lock").is_file():
        raise SystemExit("Prepare .venv y renv antes de construir el sitio.")
    env = os.environ.copy()
    env.update(QUARTO_PYTHON=str(py), QUARTO_R=str(Path(config["rscript"]).parent),
               RENV_PROJECT=str(ROOT), R_PROFILE_USER=str(ROOT / ".Rprofile"),
               RENV_CONFIG_CACHE_ENABLED="FALSE")
    env["PATH"] = str(py.parent) + os.pathsep + env.get("PATH", "")
    return env


def prepare():
    source = ROOT / "img" / "Modelo de tres capas.svg"
    target = SITE / "img" / source.name
    target.parent.mkdir(exist_ok=True)
    # Inkscape flowRoot is not supported by web browsers. Convert only flowed
    # labels in the generated copy; keep the author's source byte-for-byte intact.
    ns = "http://www.w3.org/2000/svg"
    ET.register_namespace("", ns)
    tree = ET.parse(source)
    for parent in tree.iter():
        for flow in list(parent):
            if flow.tag != f"{{{ns}}}flowRoot":
                continue
            rect = flow.find(f".//{{{ns}}}rect")
            paragraphs = flow.findall(f"{{{ns}}}flowPara")
            if rect is None or not paragraphs:
                raise SystemExit("Etiqueta SVG fluida no reconocida; revisar el original.")
            x = float(rect.attrib["x"]) + float(rect.attrib["width"]) / 2
            y = float(rect.attrib["y"]) + 24
            lines = textwrap.wrap(" ".join("".join(p.itertext()) for p in paragraphs),
                                  width=max(10, int(float(rect.attrib["width"]) / 12)))
            text = ET.Element(f"{{{ns}}}text", {
                "transform": flow.attrib.get("transform", ""),
                "style": "font-family:sans-serif;font-size:24px;fill:#000;text-anchor:middle",
            })
            for i, line in enumerate(lines):
                ET.SubElement(text, f"{{{ns}}}tspan", {"x": str(x), "y": str(y + 28 * i)}).text = line
            parent.insert(list(parent).index(flow), text)
            parent.remove(flow)
    tree.write(target, encoding="utf-8", xml_declaration=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=["render", "preview", "check"])
    args = parser.parse_args()
    config = tools()
    env = environment(config)
    prepare()
    if args.action == "check":
        subprocess.run([config["rscript"], "-e", 's <- renv::status(); if (!isTRUE(s$synchronized)) quit(status=1)'], cwd=ROOT, env=env, check=True)
        subprocess.run([sys.executable, "-m", "pip", "check"], cwd=ROOT, check=True)
    elif args.action == "preview":
        subprocess.run([config["quarto"], "preview", str(SITE), "--no-browser", "--host", "127.0.0.1"], cwd=ROOT, env=env, check=True)
        return
    # A clean output prevents deleted pages from remaining in the public directory.
    subprocess.run([config["quarto"], "render", str(SITE), "--execute"], cwd=ROOT, env=env, check=True)
    subprocess.run([sys.executable, str(ROOT / "scripts" / "check_site.py")], cwd=ROOT, check=True)


if __name__ == "__main__":
    main()
