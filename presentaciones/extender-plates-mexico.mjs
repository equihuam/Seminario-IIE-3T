import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { PresentationFile, FileBlob } from '@oai/artifact-tool';
const root=process.cwd(), tmp=path.join(root,'.local/slides-intro');
const skill=process.env.PRESENTATIONS_SKILL_DIR;
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(root,'output/Introduccion-iie3t-redes-bayesianas-v2.pptx')));
const records=(await p.inspect({kind:'slide,textbox,shape,layout',maxChars:200000})).ndjson.split('\n').filter(Boolean).map(JSON.parse);
await fs.writeFile(path.join(tmp,'v3-before.ndjson'),JSON.stringify(records));
const oldIds=p.slides.items.map(s=>s.id);
const C={bg:'#FAFAF7',ink:'#18343A',muted:'#52656A',context:'#087E86',obs:'#AA6717',latent:'#73528C',gray:'#DDE5E6',white:'#FFFFFF'};
let seq=0;
function shape(s,g,x,y,w,h,fill='none',stroke='none',lw=0){return s.shapes.add({name:`mexico-${++seq}`,geometry:g,position:{left:x,top:y,width:w,height:h},fill,line:{fill:stroke,width:lw,style:'solid'}});}
function txt(s,text,x,y,w,h,size=28,color=C.ink,bold=false){const q=shape(s,'textbox',x,y,w,h);q.text=text;q.text.style={typeface:'Arial',fontSize:size,color,bold,wrap:'square',autoFit:'none',insets:0};return q;}
function node(s,label,x,y,color,observed=false,square=false){const q=shape(s,square?'rect':'ellipse',x-39,y-39,78,78,observed?C.gray:C.white,color,2.8);q.text=label;q.text.style={typeface:'Arial',fontSize:30,color,bold:true,alignment:'center',verticalAlignment:'middle',insets:0};return q;}
function arrow(s,a,b,from,to,dashed=false){return s.shapes.connect(a,b,{kind:'straight',fromSide:from,toSide:to,line:{fill:C.muted,width:2.5,style:dashed?'dashed':'solid'},tail:{type:'triangle',width:'med',length:'med'}});}
function slide(title,n,notes){const s=p.slides.add();s.background.fill=C.bg;txt(s,title,64,42,1152,76,44,C.ink,true);txt(s,String(n),1165,668,50,30,18,C.muted);s.speakerNotes.text=notes;return s;}
const source='Fuente: descripción del procedimiento por el equipo, P016, 2026-10-08. Diagrama didáctico de índices y escalas, no reconstrucción de la red operativa TAN. Cada nodo puede resumir un vector de variables. No se ha auditado el modelo entrenado ni reproducido el mapa.';
const a=slide('Un modelo compartido para los píxeles de México',10,source+'\nImagen original: img/Mapa_México_Página_3.png, proporcionada por el usuario, mapa rotulado Integridad Ecosistémica 2018. Se preserva completa, incluida su leyenda. La imagen no especifica aquí la resolución ni el procedimiento de cálculo del índice. Su escala 0–1 no se interpreta como probabilidad ni porcentaje de integridad. El modelo se entrena y luego se aplica a los vectores de cada píxel, sin reentrenarlo por píxel. En esta extensión θ resume todos los parámetros compartidos y fijados para la aplicación, ampliando el uso previo de θ para parámetros de observación.');
const bytes=await fs.readFile(path.join(root,'img/Mapa_México_Página_3.png'));
a.images.add({blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:'image/png',alt:'Mapa de Integridad Ecosistémica de México, 2018, con leyenda original',fit:'contain',position:{left:55,top:132,width:690,height:533}});
txt(a,'En cada píxel i',785,158,425,45,31,C.context,true);
txt(a,'Un vector reúne contexto Xᵢ\ny detección Yᵢ.',785,213,425,92,28);
txt(a,'El mismo modelo entrenado',785,327,425,82,31,C.ink,true);
txt(a,'θ permanece fijo. Cambian los\nvalores de entrada y puede\ncambiar el diagnóstico.',785,407,425,119,28);
txt(a,'θ: parámetros compartidos\npara aplicar el modelo.',785,566,425,78,24,C.muted);
const b=slide('Contexto compartido y detección por píxel',11,source+'\nSimplificación: cada píxel i pertenece a una sola zona o clase j y comparte el componente contextual Xⱼ. El plate exterior repite j=1,…,J; el interior repite i=1,…,nⱼ. nⱼ puede variar. θ es global y queda fuera de ambos plates. Xⱼ no representa necesariamente todo el contexto: covariables finas adicionales podrían llevar índice ij. Una clase de Holdridge puede incluir áreas desconectadas; el anidamiento es pertenencia, no una frontera geométrica obligatoria. Múltiples capas gruesas con particiones distintas podrían requerir índices cruzados, no un anidamiento único. Compartir valores observados no introduce por sí solo efectos aleatorios ni demuestra independencia espacial. La agregación, remuestreo y resolución no crean observaciones independientes. Xⱼ→Zᵢⱼ continúa en evaluación y se marca con trazo discontinuo. Es una anotación didáctica, no una flecha probabilística especial. Las otras flechas tampoco prueban causalidad.\nPregunta oral: dos píxeles tienen la misma zona de vida, ¿deben tener el mismo IIE? Respuesta esperada: no necesariamente; pueden diferir sus señales y otras covariables. Usan parámetros comunes, pero reciben evidencia distinta.');
shape(b,'rect',64,244,710,348,'none',C.muted,2);
shape(b,'rect',105,392,625,156,'none',C.muted,2);
txt(b,'Zonas o clases  j = 1,…,J',85,553,650,32,23,C.context);
txt(b,'Píxeles de j  i = 1,…,nⱼ',121,503,510,32,23,C.muted);
const x=node(b,'Xⱼ',220,314,C.context,true),z=node(b,'Zᵢⱼ',250,449,C.latent),y=node(b,'Yᵢⱼ',605,449,C.obs,true),theta=node(b,'θ',605,171,C.ink,false,true);
arrow(b,x,z,'bottom','top',true);arrow(b,x,y,'right','top');arrow(b,z,y,'right','left');arrow(b,theta,y,'bottom','top');
txt(b,'Parámetros globales',315,151,239,67,25,C.muted);
txt(b,'Xⱼ  Contexto compartido',824,167,390,40,28,C.context,true);
txt(b,'Ejemplo: zona de vida\nde Holdridge.',824,215,390,84,26);
txt(b,'Yᵢⱼ  Detección local',824,321,390,43,28,C.obs,true);
txt(b,'Zᵢⱼ  Condición inferida',824,378,390,45,28,C.latent,true);
txt(b,'Gris: observado. Blanco: latente.\nθ: parámetros fijados.\nDiscontinuo: relación en evaluación.',824,461,390,112,22,C.muted);
txt(b,'Compartir contexto no obliga a obtener el mismo IIE ni garantiza independencia espacial.',64,625,1145,48,25,C.ink);
const all=(await p.inspect({kind:'slide',maxChars:20000})).ndjson.split('\n').filter(Boolean).map(JSON.parse).filter(r=>r.kind==='slide');
const ids=all.map(r=>r.id);p.slides.reorder([...ids.slice(0,9),ids[10],ids[11],ids[9]]);
const footer=records.find(r=>r.slideIndex===9 && r.text==='10');if(!footer)throw new Error('Quiz footer missing');p.resolve(footer.id).text='12';
const candidate=path.join(tmp,'candidate-v3.pptx'),final=path.join(root,'output/Introduccion-iie3t-redes-bayesianas-v3.pptx');
await(await PresentationFile.exportPptx(p)).save(candidate);
const result=await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,explicitTotalSlideCount:12,requiredNativeTableOwnerSlides:[5],requiredNativeChartOwnerSlides:[],pythonExecutable:process.env.PRESENTATIONS_PYTHON,integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','5'],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:path.join(tmp,'v3.validation.json')});
const deck=await PresentationFile.importPptx(await FileBlob.load(final));
for(const [i,s] of deck.slides.items.entries()){const png=await deck.export({slide:s,format:'png',scale:1});await fs.writeFile(path.join(tmp,`v3-slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));}
console.log(JSON.stringify({final:result.finalPath,sha256:result.finalSha256,rendered:12}));
