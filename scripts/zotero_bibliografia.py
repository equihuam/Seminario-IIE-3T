"""Consultas GET a Zotero local; sin dependencias externas ni acceso a adjuntos."""
import argparse
import json
from pathlib import Path
import re
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import ProxyHandler, Request, build_opener

BASE = "http://127.0.0.1:23119/api/"


def clave(value):
    if not re.fullmatch(r"[A-Z0-9]{8}", value):
        raise argparse.ArgumentTypeError("Usa la clave Zotero de ocho caracteres, no la clave BibTeX.")
    return value


def consultar(ruta, **params):
    url = BASE + ruta + ("?" + urlencode(params) if params else "")
    request = Request(url, headers={"Zotero-API-Version": "3"}, method="GET")
    # El tráfico local no debe pasar por el proxy del entorno.
    with build_opener(ProxyHandler({})).open(request, timeout=5) as response:
        return response.read().decode("utf-8"), response.headers


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    commands.add_parser("estado", help="Comprueba respuesta y versión; no lee registros.")
    commands.add_parser("grupos", help="Lista grupos disponibles en Zotero local.")
    collections = commands.add_parser("colecciones", help="Lista nombres y claves de colecciones.")
    collections.add_argument("--inicio", type=int, default=0)
    search = commands.add_parser("buscar", help="Consulta hasta 20 registros de una colección personal.")
    search.add_argument("--coleccion", type=clave, required=True)
    search.add_argument("--consulta", required=True)
    search.add_argument("--inicio", type=int, default=0)
    export = commands.add_parser("exportar", help="Exporta ítems seleccionados; nunca sobrescribe archivos.")
    export.add_argument("--item", type=clave, action="append", required=True)
    export.add_argument("--salida", type=Path, required=True)
    for command in (collections, search, export):
        scope = command.add_mutually_exclusive_group(required=True)
        scope.add_argument("--grupo", type=int, help="ID numérico de la biblioteca de grupo.")
        scope.add_argument("--personal", action="store_true", help="Usar explícitamente la biblioteca personal.")
    args = parser.parse_args(argv)
    if getattr(args, "inicio", 0) < 0:
        parser.error("--inicio debe ser cero o mayor")
    if getattr(args, "grupo", None) is not None and args.grupo <= 0:
        parser.error("--grupo debe ser un ID positivo")
    library = f"groups/{args.grupo}" if getattr(args, "grupo", None) else "users/0"
    try:
        if args.command == "estado":
            _, headers = consultar("")
            print(json.dumps({"conexion": "correcta", "api": headers.get("Zotero-API-Version"),
                              "zotero": headers.get("Zotero-Version")}, ensure_ascii=False))
        elif args.command == "grupos":
            rows = json.loads(consultar("users/0/groups")[0])
            print(json.dumps([{"id": row["id"], "nombre": row["data"]["name"]}
                              for row in rows], ensure_ascii=False, indent=2))
        elif args.command == "exportar":
            if args.salida.exists():
                raise ValueError("El archivo ya existe. Exporta a otro nombre y revisa las diferencias.")
            keys = list(dict.fromkeys(args.item))
            # Verificar existencia y tipo antes de crear el archivo local.
            for key in keys:
                data = json.loads(consultar(f"{library}/items/{key}")[0])["data"]
                if data["itemType"] in ("attachment", "note", "annotation"):
                    raise ValueError("Selecciona referencias bibliográficas, no notas ni adjuntos.")
            bib, _ = consultar(f"{library}/items", itemKey=",".join(keys), format="bibtex")
            if not bib.strip():
                raise ValueError("Zotero devolvió una exportación vacía.")
            with args.salida.open("x", encoding="utf-8", newline="\n") as handle:
                handle.write(bib)
            print(f"Exportados {len(keys)} ítems seleccionados a {args.salida.resolve()}")
        else:
            if args.command == "colecciones":
                body, headers = consultar(f"{library}/collections", limit=20, start=args.inicio)
                rows = [{"clave": row["key"], "nombre": row["data"]["name"]}
                        for row in json.loads(body)]
            else:
                body, headers = consultar(f"{library}/collections/{args.coleccion}/items/top",
                                          q=args.consulta, limit=20, start=args.inicio)
                rows = []
                for row in json.loads(body):
                    data = row["data"]
                    if data["itemType"] not in ("attachment", "note", "annotation"):
                        rows.append({"clave": row["key"], "titulo": data.get("title"),
                                     "autores": data.get("creators", []), "fecha": data.get("date"),
                                     "doi": data.get("DOI", "")})
            print(json.dumps({"resultados": rows, "inicio": args.inicio,
                              "total_api": headers.get("Total-Results"),
                              "nota": "Máximo 20 por consulta; continúa con --inicio 20, 40… si hace falta."},
                             ensure_ascii=False, indent=2))
        return 0
    except HTTPError as error:
        message = {403: "Habilita la comunicación con otras aplicaciones en Zotero: Ajustes > Avanzado.",
                   404: "No existe esa ruta, colección o ítem en la biblioteca local elegida."}
        print(f"HTTP {error.code}: {message.get(error.code, 'Revisa la versión y configuración de Zotero.')}", file=sys.stderr)
    except (URLError, TimeoutError):
        print("Zotero local no responde. Abre la aplicación en este mismo equipo y revisa la API local.", file=sys.stderr)
    except (OSError, ValueError, KeyError) as error:
        print(f"No se completó la operación: {error}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
