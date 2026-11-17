"""Genera una copia portátil del tablero publicado, con los mismos módulos y API."""
import base64
import json
import re
import sys
from pathlib import Path

app, target = map(Path, sys.argv[1:])
modules = {}
for source in app.glob("*.mjs"):
    code = source.read_text(encoding="utf-8")
    code = re.sub(r"""(['"])\./([\w-]+\.mjs)\1""", r"'pwa/\2'", code)
    if source.name == "app.mjs":
        code = code.replace("location.hash==='#lecturas'", "(!location.hash || location.hash==='#lecturas')")
        code = code.replace("new URL('agenda.ics',document.baseURI)", "new URL('https://dash-seminario-iie.netlify.app/app/agenda.ics')")
        for name in ("config.json", "encuentros.json"):
            data = json.loads((app / name).read_text(encoding="utf-8-sig"))
            if name == "config.json" and set(data) != {"supabaseUrl","publishableKey","emailAccessReady"}:
                raise ValueError("Revisar la configuración pública")
            url = "data:application/json;base64," + base64.b64encode(json.dumps(data).encode()).decode()
            code = code.replace("'"+name+"'", repr(url)).replace("'./"+name+"'", repr(url))
        code = code.replace("if('serviceWorker' in navigator)", "if(location.protocol==='https:' && 'serviceWorker' in navigator)")
    modules["pwa/"+source.name] = "data:text/javascript;base64," + base64.b64encode(code.encode()).decode()
html = (app/"index.html").read_text(encoding="utf-8")
html = html.replace('<script type="module" src="app.mjs"></script>', '<script type="importmap">'+json.dumps({"imports":modules})+'</script><script type="module">import "pwa/app.mjs";</script>')
html = html.replace('<link rel="stylesheet" href="app.css">', '<style>'+(app/"app.css").read_text(encoding="utf-8")+'</style>')
html = html.replace('href="directiva-pwa.patch"', 'href="https://dash-seminario-iie.netlify.app/app/directiva-pwa.patch"')
html = re.sub(r'<link rel="(?:manifest|apple-touch-icon)"[^>]*>', '', html)
icon="data:image/svg+xml;base64,"+base64.b64encode((app/"icon.svg").read_bytes()).decode()
html=html.replace('"icon.svg"',json.dumps(icon))
# Opening this file needs no local HTTP server; installation uses the hosted site.
html=html.replace('</head>', '<style>#install{display:none!important}</style></head>')
target.write_text(html,encoding="utf-8")
