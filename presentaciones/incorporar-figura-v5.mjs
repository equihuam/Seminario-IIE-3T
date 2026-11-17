// Copiar a .local/slides-intro para resolver el runtime empaquetado.
// Fases: preparar | finalizar. No regenera ni modifica la figura aprobada.
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Presentation, PresentationFile, FileBlob} from '@oai/artifact-tool';
const root=process.cwd(), tmp=path.join(root,'.local/slides-intro/v5-mapa-pixeles');
// Utilidad histórica: la fuente de 16 diapositivas fue retirada por Miguel.
const source=process.env.V5_SOURCE_16 ? path.resolve(root,process.env.V5_SOURCE_16) : null;
const final=path.join(root,'output',process.env.DECK_FILENAME || 'Introduccion-iie3t-redes-bayesianas-v5.pptx');
const notes='Fuentes: presentaciones/img/ie_2018_st_v2.tif y zvh-mx3qw-mexico-Albers.tif, aportados por Miguel. Figura: presentaciones/img/iie-2018-pixeles-holdridge.png, con ajuste gráfico de Miguel aprobado en P-ME-062. Procedencia y método en presentaciones/figura-iie-pixeles.md y JSON homónimo. IIE: celdas nativas de 250 m; Holdridge: aproximadamente 850 m. Detalle de 64 valores originales, redondeados a dos decimales; asignación de clases por vecino más cercano al centro de celda. El triángulo amarillo conecta visualmente el lugar y su ampliación: no representa una región ecológica ni cambia los valores del mapa. Códigos 18 y 22 sin catálogo nominal aportado. Paleta propuesta. La escala 0–1 expresa un índice sintético, no porcentaje determinista ni probabilidad escalar pura. θ permanece fijo según la descripción del equipo; no se ejecuta nuevamente el modelo. X reúne contexto y Y detección. Los rectángulos indican repetición de clases j y de sus píxeles i; no son un DAG ni demuestran independencia espacial. Compartir una clase no obliga a obtener el mismo IIE. Pregunta: ¿por qué dos píxeles de la misma clase pueden tener distinto IIE? Respuesta esperada: pueden diferir las detecciones y otras covariables. No se puede atribuir la diferencia a una causa concreta solo a partir del mapa. La distribución posterior no está disponible en estos GeoTIFF. Los rótulos de detalle pueden ampliarse durante la exposición.';
await fs.mkdir(tmp,{recursive:true});
async function render(deck, dir){
 await fs.mkdir(dir,{recursive:true});
 for(const [i,s] of deck.slides.items.entries()){
  const b=await deck.export({slide:s,format:'png',scale:1});
  await fs.writeFile(path.join(dir,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await b.arrayBuffer()));
 }
}
if(process.argv[2]==='preparar'){
 if(!source) throw Error('Utilidad histórica: definir V5_SOURCE_16 con una copia de 16 diapositivas. La v5 vigente ya incluye la figura.');
 const original=await PresentationFile.importPptx(await FileBlob.load(source));
 if(original.slides.items.length!==16) throw Error('Se requiere la fuente histórica de 16 diapositivas; no insertar otra vez en v5 vigente.');
 await fs.writeFile(path.join(tmp,'source-inspect.ndjson'),(await original.inspect({kind:'slide,layout',maxChars:200000})).ndjson);
 await render(original,path.join(tmp,'antes'));
 const p=Presentation.create({slideSize:{width:1280,height:720}}),s=p.slides.add();
 s.background.fill='#FAFAF7';s.speakerNotes.text=notes;
 s.images.add({blob:await fs.readFile(path.join(root,'presentaciones/img/iie-2018-pixeles-holdridge.png')),
  contentType:'image/png',alt:'IIE de México 2018, 64 píxeles reales y clases de Holdridge; figura ajustada por Miguel',
  fit:'contain',position:{left:64,top:8,width:1152,height:704}});
 const page=s.shapes.add({geometry:'textbox',position:{left:1230,top:673,width:45,height:26},fill:'none',line:{fill:'none',width:0}});
 page.text='12';page.text.style={typeface:'Arial',fontSize:18,color:'#52656A',insets:0};
 await (await PresentationFile.exportPptx(p)).save(path.join(tmp,'figura.pptx'));
 await fs.writeFile(path.join(tmp,'notes.txt'),notes);
 console.log('Preparación y 16 renders originales completos');
}else if(process.argv[2]==='finalizar'){
 const skill=process.env.PRESENTATIONS_SKILL_DIR;
 const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
 const result=await finalizePresentation({workspaceDir:root,candidatePath:path.join(tmp,'candidate.pptx'),finalPath:final,
  explicitTotalSlideCount:17,requiredNativeTableOwnerSlides:[2,7,8],requiredNativeChartOwnerSlides:[],
  pythonExecutable:process.env.PRESENTATIONS_PYTHON,
  integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','2','--require-native-table-slide','7','--require-native-table-slide','8'],
  fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:path.join(tmp,'validation.json')});
 await render(await PresentationFile.importPptx(await FileBlob.load(final)),path.join(tmp,'despues'));
 console.log(JSON.stringify({final:result.finalPath,rendered:17}));
}else throw Error('Fase esperada: preparar | finalizar');
