"""Inserta la lámina creada con Artifact Tool preservando las partes originales.

No importa/exporta las diapositivas originales: mantiene su XML, medios,
maestros, tablas, conectores y notas. Solo desplaza índices y numeración visible.
"""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import re
import json
import hashlib
import posixpath
import os
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
TMP=ROOT/'.local/slides-intro/v5-mapa-pixeles'
if not os.environ.get('V5_SOURCE_16'):
    raise SystemExit('Utilidad histórica: definir V5_SOURCE_16 con la fuente de 16 diapositivas. La v5 vigente ya incluye la figura.')
SOURCE=(ROOT/os.environ['V5_SOURCE_16']).resolve()
R='http://schemas.openxmlformats.org/package/2006/relationships'


def shift(text):
    return re.sub(r'(notesSlide|slide)(\d+)(\.xml)',lambda m:m[1]+str(int(m[2])+(int(m[2])>=12))+m[3],text)


with ZipFile(SOURCE) as src, ZipFile(TMP/'figura.pptx') as ins:
    parts={}
    for name in src.namelist():
        data=src.read(name)
        newname=shift(name) if name.startswith(('ppt/slides/','ppt/notesSlides/')) else name
        if name.endswith('.rels'):
            data=shift(data.decode('utf-8')).encode('utf-8')
        if name=='[Content_Types].xml':
            t=shift(data.decode('utf-8'))
            extra='<Override PartName="/ppt/slides/slide12.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/><Override PartName="/ppt/notesSlides/notesSlide12.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/>'
            data=t.replace('</Types>',extra+'</Types>').encode('utf-8')
        m=re.fullmatch(r'ppt/slides/slide(\d+)\.xml',name)
        if m and int(m[1])>=12:
            old=int(m[1]);needle=f'<a:t>{old:02}</a:t>'.encode()
            assert data.count(needle)==1, f'Número de diapositiva ambiguo: {name}'
            data=data.replace(needle,f'<a:t>{old+1:02}</a:t>'.encode())
        # Marcadores de número de diapositiva en notas guardadas por PowerPoint.
        m=re.fullmatch(r'ppt/notesSlides/notesSlide(\d+)\.xml',name)
        if m and int(m[1])>=12:
            old=int(m[1]); data=data.replace(f'<a:t>{old}</a:t>'.encode(),f'<a:t>{old+1}</a:t>'.encode())
        parts[newname]=data
    # Nueva relación de presentación sin reutilizar identificadores.
    relname='ppt/_rels/presentation.xml.rels'
    rels=ET.fromstring(parts[relname]); rid='rId'+str(max(int(e.get('Id')[3:]) for e in rels)+1)
    extra=f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide12.xml"/>'
    parts[relname]=parts[relname].replace(b'</Relationships>',extra.encode()+b'</Relationships>')
    pres=parts['ppt/presentation.xml'].decode()
    ids=list(re.finditer(r'<p:sldId\s[^>]*/>',pres)); assert len(ids)==16
    newid=max(int(re.search(r'\bid="(\d+)"',m[0])[1]) for m in ids)+1
    at=ids[10].end();pres=pres[:at]+f'<p:sldId id="{newid}" r:id="{rid}"/>'+pres[at:]
    parts['ppt/presentation.xml']=pres.encode()
    parts['docProps/app.xml']=re.sub(rb'<Slides>16</Slides>',b'<Slides>17</Slides>',parts['docProps/app.xml'])
    parts['ppt/slides/slide12.xml']=ins.read('ppt/slides/slide1.xml')
    rel=ET.fromstring(ins.read('ppt/slides/_rels/slide1.xml.rels'))
    for e in rel:
        typ=e.get('Type').split('/')[-1]
        if typ=='image':
            target=e.get('Target')
            source_media=target.lstrip('/') if target.startswith('/') else posixpath.normpath('ppt/slides/'+target)
            parts['ppt/media/iie-pixeles-aprobado.png']=ins.read(source_media)
            e.set('Target','../media/iie-pixeles-aprobado.png')
        elif typ=='slideLayout':e.set('Target','../slideLayouts/slideLayout6.xml')
        elif typ=='notesSlide':e.set('Target','../notesSlides/notesSlide12.xml')
        else:raise ValueError(f'Relación no prevista: {typ}')
    ET.register_namespace('',R)
    parts['ppt/slides/_rels/slide12.xml.rels']=ET.tostring(rel,encoding='utf-8',xml_declaration=True)
    parts['ppt/notesSlides/notesSlide12.xml']=ins.read('ppt/notesSlides/notesSlide1.xml')
    rel=ET.fromstring(ins.read('ppt/notesSlides/_rels/notesSlide1.xml.rels'))
    for e in rel:
        if e.get('Type').endswith('/slide'):e.set('Target','../slides/slide12.xml')
        elif e.get('Type').endswith('/notesMaster'):e.set('Target','../notesMasters/notesMaster1.xml')
        else:raise ValueError('Relación de notas no prevista')
    parts['ppt/notesSlides/_rels/notesSlide12.xml.rels']=ET.tostring(rel,encoding='utf-8',xml_declaration=True)
    approved=(ROOT/'presentaciones/img/iie-2018-pixeles-holdridge.png').read_bytes()
    assert parts['ppt/media/iie-pixeles-aprobado.png']==approved
    for name,data in parts.items():
        if name.endswith(('.xml','.rels')):ET.fromstring(data)
    with ZipFile(TMP/'candidate.pptx','w',ZIP_DEFLATED) as out:
        for name,data in parts.items():out.writestr(name,data)
    report={'source_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
            'approved_png_sha256':hashlib.sha256(approved).hexdigest(),
            'slides':17,'inserted_at':12,'original_slides':'XML conservado salvo número visible en 12–16',
            'source_file_overwritten':False}
    (TMP/'insertion.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False))
