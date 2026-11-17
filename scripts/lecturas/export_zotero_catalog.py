"""Read group Zotero metadata into a private catalog snapshot; never write Zotero."""
import argparse
import ctypes
from ctypes import wintypes
from html.parser import HTMLParser
import json
import os
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

GROUP = 6712171


class PlainText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []

    def handle_data(self, data):
        self.parts.append(data)


def plain(value):
    parser = PlainText()
    parser.feed(value)
    return ''.join(parser.parts).strip()


def api_key():
    if os.environ.get('ZOTERO_API_KEY'):
        return os.environ['ZOTERO_API_KEY']
    if os.name != 'nt':
        raise ValueError('Configura ZOTERO_API_KEY en el entorno privado.')
    class Credential(ctypes.Structure):
        _fields_ = [('Flags', wintypes.DWORD), ('Type', wintypes.DWORD),
                    ('TargetName', wintypes.LPWSTR), ('Comment', wintypes.LPWSTR),
                    ('LastWritten', wintypes.FILETIME), ('CredentialBlobSize', wintypes.DWORD),
                    ('CredentialBlob', ctypes.POINTER(ctypes.c_ubyte)), ('Persist', wintypes.DWORD),
                    ('AttributeCount', wintypes.DWORD), ('Attributes', ctypes.c_void_p),
                    ('TargetAlias', wintypes.LPWSTR), ('UserName', wintypes.LPWSTR)]
    pointer = ctypes.POINTER(Credential)()
    vault = ctypes.WinDLL('Advapi32.dll')
    vault.CredReadW.argtypes = [wintypes.LPCWSTR, wintypes.DWORD, wintypes.DWORD, ctypes.POINTER(ctypes.POINTER(Credential))]
    vault.CredReadW.restype = wintypes.BOOL
    vault.CredFree.argtypes = [ctypes.c_void_p]
    if not vault.CredReadW('zotero/seminario-iie3t', 1, 0, ctypes.byref(pointer)):
        raise ValueError('No está disponible la credencial del grupo Zotero.')
    try:
        raw = ctypes.string_at(pointer.contents.CredentialBlob, pointer.contents.CredentialBlobSize)
        return raw.decode('utf-16-le' if b'\0' in raw else 'utf-8').rstrip('\0')
    finally:
        vault.CredFree(pointer)


def catalog(key=None, base='https://api.zotero.org'):
    rows, start, library_version = [], 0, None
    while True:
        params = urlencode({'format': 'json', 'include': 'data,bib', 'style': 'apa',
                            'locale': 'es-ES', 'limit': 100, 'start': start,
                            'sort': 'title', 'direction': 'asc'})
        headers = {'Zotero-API-Version': '3'}
        if key:
            headers['Zotero-API-Key'] = key
        request = Request(f'{base}/groups/{GROUP}/items/top?{params}', headers=headers)
        with urlopen(request, timeout=30) as response:
            current_version = response.headers.get('Last-Modified-Version')
            if library_version is not None and current_version != library_version:
                raise ValueError('Zotero cambió durante la consulta; vuelve a sincronizar.')
            library_version = current_version
            page = json.load(response)
        for item in page:
            data = item['data']
            if data['itemType'] in ('attachment', 'note', 'annotation'):
                continue
            title = plain(data.get('title', ''))
            citation = plain(item.get('bib', ''))
            if not title or not citation or len(title) > 2000 or len(citation) > 2000:
                raise ValueError('Hay una referencia sin título/cita válida; revisar en Zotero.')
            doi = data.get('DOI', '').strip()
            url = 'https://doi.org/'+doi if doi else data.get('url', '')
            if not url.startswith(('https://', 'http://')):
                url = ''
            rows.append({'zotero_key': item['key'], 'group_id': GROUP, 'title': title,
                         'citation': citation, 'url': url, 'source_version': item['version']})
        if len(page) < 100:
            return {'group_id': GROUP, 'library_version': library_version, 'references': rows}
        start += 100


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path('.local/lecturas/zotero-catalog.json'))
    parser.add_argument('--local', action='store_true', help='Leer el catálogo del grupo en Zotero Desktop sincronizado.')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    target = args.output.resolve()
    if not any(target.is_relative_to(root / directory) for directory in ('.local', 'private')):
        raise SystemExit('El catálogo privado solo se guarda bajo .local o private del proyecto.')
    try:
        snapshot = catalog(base='http://127.0.0.1:23119/api') if args.local else catalog(api_key())
    except Exception:
        raise SystemExit('No se pudo consultar el catálogo Zotero. No se modificó ninguna referencia ni se muestran credenciales.')
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(f"Catálogo leído: {len(snapshot['references'])} referencias; grupo {GROUP}. Solo metadatos, sin adjuntos.")


if __name__ == '__main__':
    main()
