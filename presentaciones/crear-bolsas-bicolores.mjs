import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const runtime=process.env.PRESENTATIONS_RUNTIME,skill=process.env.PRESENTATIONS_SKILL_DIR;
if(!runtime||!skill)throw Error('Definir PRESENTATIONS_RUNTIME y PRESENTATIONS_SKILL_DIR');
process.env.RUNTIME_NODE_MODULES=path.join(runtime,'node/node_modules');
const {Presentation,PresentationFile}=await import(pathToFileURL(path.join(runtime,'node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs')).href);
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const root=process.cwd(),tmp=path.join(root,'.local/slides-bolsas'),out=path.join(root,'output/bolsas-bicolores');
await fs.mkdir(tmp,{recursive:true});await fs.mkdir(out,{recursive:true});
const p=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#FAFAF7',ink:'#18343A',muted:'#52656A',x:'#087E86',y:'#AA6717',z:'#73528C',red:'#CC4848',blue:'#397BC2',yellow:'#EDC747',green:'#408768',white:'#FFFFFF',black:'#30343B'};
const source='Fuentes: ejercicios/tres-bolsas/GUIA.md v0.1, R/modelo.R y datos/contextos.csv y recetas.csv; P-ME-184–186. Ejemplo sintético, no fórmula del IIE operativo ni entrenamiento TAN. iie-teoria.qmd §§5.1–5.2 y 21.2, SHA256 6CEE34177FB38EB66B20610FA606D84DB9FB36E0426E6CBE8D3582932790B502. Referencia y escala estipuladas en el juego.';
let serial=0;
function box(s,g,x,y,w,h,fill='none',stroke='none',lw=0){return s.shapes.add({name:'obj-'+(++serial),geometry:g,position:{left:x,top:y,width:w,height:h},fill,line:{fill:stroke,width:lw,style:'solid'}});}
function text(s,t,x,y,w,h,size=30,color=C.ink,bold=false){const b=box(s,'textbox',x,y,w,h);b.text=t;b.text.style={typeface:'Arial',fontSize:size,bold,color,wrap:'square',autoFit:'none',insets:0};return b;}
function slide(title,note=''){const s=p.slides.add();s.background.fill=C.bg;text(s,title,64,42,1152,80,44,C.ink,true);text(s,String(p.slides.items.length).padStart(2,'0'),1176,676,40,24,18,C.muted);s.speakerNotes.text=source+'\n'+note;return s;}
function foot(s,t){text(s,t,64,618,1110,48,24,C.muted);}
function marbles(s,x,y,k,a,b,label){box(s,'roundRect',x,y,272,192,C.white,'#ABBAB8',2);for(let i=0;i<10;i++)box(s,'ellipse',x+22+(i%5)*47,y+26+Math.floor(i/5)*70,36,36,i<k?a:b,C.ink,1.5);text(s,label,x,y+210,295,78,26,C.ink,true);}
function item(s,no,title,body,y){text(s,no,64,y,64,54,38,C.x,true);text(s,title,150,y,1040,46,32,C.ink,true);text(s,body,150,y+53,1040,68,27,C.muted);}
function table(s,values,x,y,w,h,widths,size=27){const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:h,values,columnWidths:widths});t.borders.assign({fill:'#CAD6D2',width:1,style:'solid'});for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){const z=t.getCell(r,c);z.fill=r===0?C.ink:r%2?C.white:'#EDF1EE';z.text.style={typeface:'Arial',fontSize:size,bold:r===0,color:r===0?C.white:C.ink,alignment:c===0?'left':'center',verticalAlignment:'middle',insets:12};}return t;}
{
const s=slide('Construir, alterar e inferir una bolsa','Idea de Miguel y Octavio; variante bicolor propuesta por Miguel. Preparado con asistencia de IA. P-ME-185 informa uso exitoso del PPTX histórico para sugerir capacidad inductiva, no para evocar tres capas. Nueva variante pendiente de prueba con participantes. Pregunta inicial: ¿qué podemos saber de una bolsa sin vaciarla?');
text(s,'Una dinámica para explorar el modelo de tres capas',64,139,1090,70,33,C.x);
marbles(s,100,266,5,C.red,C.blue,'Contexto: rojo–azul');
marbles(s,504,266,5,C.yellow,C.green,'Contexto: amarillo–verde');
text(s,'¿Cómo está\ncada sistema?',865,290,335,148,40,C.z,true);
foot(s,'Seminario IIE-3T · Guía de pasos y mecánica · Borrador v0.1');
}
{
const s=slide('Preparar las bolsas y separar los papeles','Duración orientativa total: 60 minutos, divisible en dos sesiones. Diez canicas de cada color permiten reservar material para sustituciones conservando N=10 por bolsa. Coordinación custodia las recetas; revelar después de inferir. La última diapositiva es para coordinación.');
item(s,'01','Materiales','Tres bolsas opacas, seis colores y diez canicas de cada color',155);
item(s,'02','Equipo que prepara','Construye las bolsas, aplica cambios y guarda las recetas',301);
item(s,'03','Equipo que estima','Conoce el contexto, muestrea y registra sin ver la composición',447);
foot(s,'Cada bolsa es un sistema: las tres bolsas no son las tres capas');
}
{
const s=slide('1  El contexto construye la referencia','Asignar por turnos pares de colores. Primer color definido en contextos.csv. Construir cinco de cada color. Mostrar la referencia, pero ocultar después la composición alterada. Referencia 1:1 convencional del juego, no regla ecológica universal.');
text(s,'Elegir dos colores y colocar cinco canicas de cada uno',64,147,1130,62,31,C.x,true);
marbles(s,94,258,5,C.red,C.blue,'C1 · Rojo–azul\n5 : 5');
marbles(s,500,258,5,C.yellow,C.green,'C2 · Amarillo–verde\n5 : 5');
marbles(s,906,258,5,C.white,C.black,'C3 · Blanco–negro\n5 : 5');
foot(s,'Los otros cuatro colores no corresponden al contexto: su ausencia no es pérdida');
}
{
const s=slide('2  Alterar sin cambiar el total','Ejemplos de una pareja, no revelar qué receta se asigna. Sustituir dos produce 7:3; sustituir cuatro produce 9:1. Incluir dirección opuesta. Reconstruir 5:5 antes de cada ronda. La condición resultante no es la presión ni daño histórico acumulado.');
marbles(s,94,224,5,C.red,C.blue,'Referencia\n5 : 5');
marbles(s,500,224,7,C.red,C.blue,'Sustituir 2 azules por rojas\n7 : 3');
marbles(s,906,224,9,C.red,C.blue,'Sustituir 4 azules por rojas\n9 : 1');
text(s,'También puede favorecerse el otro color',64,535,1130,48,31,C.z,true);
foot(s,'Conservar diez canicas · Guardar la receta · Reconstruir la referencia entre rondas');
}
{
const s=slide('3  Muestrear con reposición individual','La binomial requiere reposición individual. Difiere del PPTX histórico que extraía tres y devolvía después. Mezclar, no mirar ni seleccionar por tacto. Mantener composición fija durante la serie. Un color ajeno al par exige revisar registro o modelo.');
const steps=[['Mezclar','Sin mirar la bolsa'],['Extraer una','Solo una canica'],['Registrar','Anotar su color'],['Devolver','Mezclar y repetir']];
for(let i=0;i<4;i++){const x=64+i*298;text(s,String(i+1),x,204,240,80,62,C.y,true);text(s,steps[i][0],x,310,260,58,33,C.ink,true);text(s,steps[i][1],x,386,260,85,27,C.muted);}
text(s,'No acumular canicas fuera de la bolsa',64,538,1100,52,34,C.z,true);
foot(s,'La reposición conserva la composición mientras acumulamos evidencia');
}
{
const s=slide('4  Registrar y ampliar la muestra','Filas inventadas para explicar formato, no datos físicos ni extracto simulado. Identificador distinto al cambiar composición. Cortes acumulados: de 12 a 30 añadir 18, no 30. Empezar físicamente con 12 y ampliar según tiempo. Simulación añade 60 y 200.');
table(s,[['Bolsa','Contexto','Extracción','Color'],['C1_R1','C1','1','rojo'],['C1_R1','C1','2','azul'],['C1_R1','C1','3','rojo']],64,166,1150,280,[300,260,280,310]);
text(s,'12 → 30 → 60 → 200 extracciones acumuladas',64,490,1140,64,36,C.x,true);
foot(s,'Ejemplo de registro · Los cortes comparten observaciones; no son réplicas independientes');
}
{
const s=slide('5  Estimar en R antes de revelar','Desde raíz, con Rproj abierto. Ruta Rscript --vanilla comprobada en R4.6.0; el inicio adicional con perfil no terminó. Cambiar nombre de resultados-clase-01 si existe. Modelo considera todas las composiciones posibles, no solo las recetas. No aprende estructura de red ni TAN. No mostrar recetas.csv antes de estimar.');
text(s,'En la consola de RStudio, desde el proyecto',64,150,1140,50,31,C.x,true);
text(s,'source("ejercicios/tres-bolsas/simular.R")\nejecutar_ejercicio(\n  salida = "ejercicios/tres-bolsas/resultados-clase-01"\n)',64,232,1150,188,27,C.ink);
text(s,'El programa simula muestras y estima una distribución de condición',64,459,1100,90,33,C.z,true);
foot(s,'Guarda tablas, incertidumbre y gráfico · Usar una carpeta nueva para cada corrida');
}
{
const s=slide('6  Leer la incertidumbre, no solo el promedio','Datos: resultados-verificados/comparacion.csv, C2_R2, semilla20261119. Medias .8155132544,.7779620142,.9227336264,.6830329346 para n12,30,60,200. Intervalos[.4,1],[.4,1],[.8,1],[.6,.8]. Verdad Z=.6 y composición3:7. Intervalos centrales discretos95%, no garantía de cubrir cada muestra. Gráfico editable construido con esos valores; se conserva resultado desfavorable.');
const x0=120,y0=530,w=635,h=325;
for(let v=0;v<=5;v++){const y=y0-v*h/5;box(s,'rect',x0,y,w,1,'#CFDAD5');text(s,(v/5).toFixed(1),66,y-15,45,30,21,C.muted);}
text(s,'Condición Z',70,149,250,34,23,C.ink,true);
const xs=[170,340,510,680],means=[.8155132544,.7779620142,.9227336264,.6830329346],los=[.4,.4,.8,.6],his=[1,1,1,.8],ns=[12,30,60,200];
const yy=y0-.6*h;for(let x=x0;x<x0+w;x+=24)box(s,'rect',x,yy,14,3,C.y);
for(let i=0;i<4;i++){const lo=y0-los[i]*h,hi=y0-his[i]*h;box(s,'rect',xs[i],hi,3,lo-hi,C.x);box(s,'rect',xs[i]-12,hi,27,3,C.x);box(s,'rect',xs[i]-12,lo,27,3,C.x);box(s,'ellipse',xs[i]-6,y0-means[i]*h-6,14,14,C.x);text(s,String(ns[i]),xs[i]-25,552,70,30,23);}
text(s,'Extracciones acumuladas',265,592,430,35,23,C.muted);
text(s,'Punto: media posterior\nBarra: intervalo del 95%\nDiscontinua: verdad del juego',830,200,370,150,27);
text(s,'Con 60 extracciones,\nel intervalo no incluye\nla condición real',830,411,370,143,30,C.z,true);
}
{
const s=slide('7  Revelar y comparar con la receta','Z=2min(K,N-K)/N; N=10; K número del primer color. Escala y simetría convencionales, no categorías expertas ordinales ni porcentajes de integridad ecológica. Revelar tras inferir. La media puede no coincidir con un nivel físico; conservar distribución completa. Comparar p y Z.');
text(s,'Condición del juego:  Z = 2 × menor cantidad / total',64,148,1130,62,33,C.z,true);
table(s,[['Composición real','Condición Z'],['5 : 5','1.0'],['7 : 3  o  3 : 7','0.6'],['9 : 1  o  1 : 9','0.2']],64,246,730,300,[460,270],31);
text(s,'¿La estimación\nse acerca a la verdad?\n\n¿El intervalo\nla incluye?',854,258,350,240,34,C.ink,true);
foot(s,'Z = 0.6 es un valor de esta escala; no significa «60% de integridad ecológica»');
}
{
const s=slide('Una bolsa permite distinguir las tres capas','Contexto fija referencia y componentes; presión modifica composición; condición describe estado resultante para quienes estiman; detección son observaciones. Relación condición-composición determinista por estipulación. No universalizar uniformidad ni atribuir causalidad ecológica a una secuencia didáctica.');
item(s,'C','Contextual','Qué colores corresponden al sistema y cuál es su referencia',163);
item(s,'D','Detección','Qué colores aparecen en nuestras extracciones',309);
item(s,'L','Latente','Qué condición inferimos a partir de esas señales y del contexto',455);
foot(s,'La composición completa existe aunque solo observemos una muestra');
}
{
const s=slide('Cerrar con tres preguntas','Respuestas: 1) Ausencia contextual, no degradación. 2) No: puede haber color presente no detectado; expresar incertidumbre. 3) Sí bajo simetría estipulada, distinta dirección. Registrar respuestas agregadas. Reporte de uso exitoso del PPTX original con fin inductivo es de Miguel; nueva variante pendiente de prueba.');
item(s,'1','¿Faltan cuatro colores o no corresponden al contexto?','Relacionar la observación con la referencia correcta',157);
item(s,'2','¿No observar un color demuestra que desapareció?','Distinguir ausencia real de falta de detección en la muestra',303);
item(s,'3','¿7:3 y 3:7 representan la misma condición?','Separar magnitud del cambio y dirección',449);
foot(s,'Conservar dudas y resultados inesperados para elegir el siguiente ejercicio');
}
{
const s=slide('Anexo para coordinación: recetas por ronda','Reservar para coordinación o mostrar después de estimar. Primer:segundo color de cada contexto. Reconstruir5:5 antes de cada ronda. Cada contexto pasa por todas las condiciones; rondas no modelan tiempo. Recetas idénticas a datos/recetas.csv. PPTX original intacto; reporte de uso inductivo P-ME-185. Borrador fuera del blog, pendiente de selección docente para publicar.');
table(s,[['Contexto','Ronda 1','Ronda 2','Ronda 3'],['C1 · rojo–azul','5 : 5','7 : 3','9 : 1'],['C2 · amarillo–verde','5 : 5','3 : 7','1 : 9'],['C3 · blanco–negro','5 : 5','7 : 3','1 : 9']],64,177,1150,310,[520,210,210,210],27);
text(s,'Cada contexto pasa por las tres condiciones',64,535,1100,50,33,C.x,true);
foot(s,'Guía y código: ejercicios/tres-bolsas/ · Nueva variante pendiente de prueba en clase');
}
for(let i=0;i<p.slides.items.length;i++){const png=await p.export({slide:p.slides.items[i],format:'png',scale:1});await fs.writeFile(path.join(tmp,'slide-'+String(i+1).padStart(2,'0')+'.png'),new Uint8Array(await png.arrayBuffer()));}
const candidate=path.join(tmp,'candidate.pptx');
await(await PresentationFile.exportPptx(p)).save(candidate);
const final=path.join(out,'Dinamica-bolsas-bicolores-v1.pptx');
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,
pythonExecutable:path.join(runtime,'python/python.exe'),
integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit','--require-native-table-slide','6','--require-native-table-slide','9','--require-native-table-slide','12'],
requiredNativeTableOwnerSlides:[6,9,12],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:path.join(tmp,'validation.json')});
console.log(final);
