"""Recupera del PPTX publicado el mapa original excluido de Git por tamaño."""
from pathlib import Path
from zipfile import ZipFile
import hashlib

ROOT = Path(__file__).resolve().parents[1]
MAP_HASH = 'f67c9d093b41a04d88d5129bd8d762ae11e6b7abf95fadf2b271da07825b56f3'
TARGET = ROOT / 'img/Mapa_México_Página_3.png'


def restore_map():
    if TARGET.exists():
        if hashlib.sha256(TARGET.read_bytes()).hexdigest() != MAP_HASH:
            raise ValueError('La imagen existente difiere del original esperado.')
        return TARGET
    source = ROOT / 'blog/presentaciones/Introduccion-iie3t-redes-bayesianas-v5.pptx'
    with ZipFile(source) as archive:
        for name in archive.namelist():
            if name.startswith('ppt/media/'):
                content = archive.read(name)
                if hashlib.sha256(content).hexdigest() == MAP_HASH:
                    with TARGET.open('xb') as output:
                        output.write(content)
                    return TARGET
    raise ValueError('El PPTX publicado no contiene el mapa original esperado.')


if __name__ == '__main__':
    print(restore_map())
