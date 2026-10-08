import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile, FileBlob } from '@oai/artifact-tool';

// Run the copy in .local/slides-intro, with the bundled node_modules junction.
const ROOT = process.cwd();
const TMP = path.join(ROOT, '.local/slides-intro');
const SKILL = process.env.PRESENTATIONS_SKILL_DIR;
const PYTHON = process.env.PRESENTATIONS_PYTHON;
if (!SKILL || !PYTHON) throw new Error('Set PRESENTATIONS_SKILL_DIR and PRESENTATIONS_PYTHON.');
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL, 'container_tools/artifact_tool_utils.mjs')).href);
const OUT = path.join(ROOT, 'output', process.env.DECK_FILENAME || 'Introduccion-iie3t-redes-bayesianas-v1.pptx');
const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const C = {bg:'#FAFAF7', ink:'#18343A', muted:'#52656A', context:'#087E86', obs:'#AA6717', latent:'#73528C', gray:'#DDE5E6', line:'#52656A', white:'#FFFFFF'};
const FONT = 'Arial';
let serial = 0;
const theory = 'Fuente: iie-teoria/iie-teoria.qmd, §§3–5 y 21, copia local del equipo consultada el 2026-10-08. https://github.com/equihuam/iie-teoria . La formulación mínima es una representación simplificada; no sustituye la implementación operativa escalar/TAN ni identifica automáticamente dimensiones latentes.';
const climate = 'Fuente: Equihua, M. y Pérez Maqueo, O. (2023), Lo Básico de Redes Bayesianas, Cafe-blog/posts/redes-bayesianas-basico/index.qmd. https://github.com/equihuam/Cafe-blog/blob/d025b97d8e27cb31f751a024505f0252c24f0a50/posts/redes-bayesianas-basico/index.qmd . Revisión local: docs/REVISION-CONCEPTUAL-CLIMA.md. Parámetros hipotéticos preservados. C abrevia aCC únicamente en estas diapositivas.';
const plates = 'Referencia de notación: Blei y Lafferty (2009), Topic Models, figura 2: https://www.cs.columbia.edu/~blei/papers/BleiLafferty2009.pdf . El rectángulo denota repetición. Esta presentación aplica esa convención a una simplificación del modelo iie-3t, no a un modelo LDA.';
function shape(s,geo,x,y,w,h,fill='none',stroke='none',lw=0,name='') {
  return s.shapes.add({geometry:geo,name:name||`obj-${++serial}`,position:{left:x,top:y,width:w,height:h},fill,line:{fill:stroke,width:lw,style:'solid'}});
}
function txt(s,str,x,y,w,h,size=28,opts={}) {
  const t=shape(s,'textbox',x,y,w,h);
  t.text=str;
  t.text.style={typeface:FONT,fontSize:size,color:opts.color||C.ink,bold:opts.bold||false,alignment:opts.align||'left',verticalAlignment:opts.middle?'middle':'top',wrap:'square',autoFit:'none',insets:0};
  return t;
}
function slide(title,notes) {
  const s=p.slides.add(); s.background.fill=C.bg;
  txt(s,title,64,42,1152,76,44,{bold:true});
  txt(s,String(p.slides.items.length).padStart(2,'0'),1165,668,50,30,18,{color:C.muted,align:'right'});
  s.speakerNotes.text=notes;
  return s;
}
function node(s,label,cx,cy,{r=43,color=C.ink,observed=false,square=false,size=32}={}) {
  const q=shape(s,square?'rect':'ellipse',cx-r,cy-r,2*r,2*r,observed?C.gray:C.white,color,2.8,`nodo-${label}-${++serial}`);
  q.text=label; q.text.style={typeface:FONT,fontSize:size,bold:true,color,alignment:'center',verticalAlignment:'middle',insets:0};
  return q;
}
function arrow(s,a,b,from='right',to='left',kind='straight') {
  // In the exported DrawingML, tail is the target end. Verify in rendered slides.
  return s.shapes.connect(a,b,{kind,fromSide:from,toSide:to,line:{fill:C.line,width:2.5,style:'solid'},tail:{type:'triangle',width:'med',length:'med'}});
}
function tri(s,x,y,idx='',scale=1) {
  const r=39*scale;
  const a=node(s,`X${idx}`,x,y,{r,color:C.context,observed:true,size:30*scale});
  const z=node(s,`Z${idx}`,x,y+180*scale,{r,color:C.latent,size:30*scale});
  const b=node(s,`Y${idx}`,x+220*scale,y+90*scale,{r,color:C.obs,observed:true,size:30*scale});
  arrow(s,a,z,'bottom','top'); arrow(s,a,b,'right','top'); arrow(s,z,b,'right','bottom');
  return {a,z,b};
}
function table(s,values,x,y,w,h,widths) {
  const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:h,values,columnWidths:widths});
  t.borders.assign({fill:'#C4D0D2',width:1,style:'solid'});
  for(let r=0;r<values.length;r++) for(let c=0;c<values[0].length;c++) {
    const cell=t.getCell(r,c); cell.fill=r===0?C.ink:(r%2?C.white:'#EDF1F0');
    cell.text.style={typeface:FONT,fontSize:26,color:r===0?C.white:C.ink,bold:r===0,verticalAlignment:'middle',alignment:c===0?'left':'center',insets:12};
  }
  return t;
}

// 1. Opening: an actual conceptual question, without overloading the cover.
{
  const s=p.slides.add(); s.background.fill=C.bg;
  txt(s,'Integridad ecosistémica\ny redes bayesianas',64,95,730,175,60,{bold:true});
  txt(s,'Una introducción al modelo de tres capas',68,294,700,50,30);
  txt(s,'¿Cómo inferimos la condición de un ecosistema\na partir de lo que observamos?',68,414,740,110,31,{color:C.muted});
  const labels=[['X','Contextual',C.context],['Y','Detección',C.obs],['Z','Latente',C.latent]];
  labels.forEach(([a,b,c],i)=>{txt(s,a,875,171+i*120,75,65,54,{bold:true,color:c});txt(s,b,968,185+i*120,260,55,30,{color:c});});
  txt(s,'Seminario iie-3t',68,626,600,35,22,{color:C.muted});
  txt(s,'01',1165,668,50,30,18,{color:C.muted,align:'right'});
  s.speakerNotes.text='Objetivo: reconocer las tres capas, interpretar un DAG con sus probabilidades y leer un plate elemental. Público principiante, sin requisito de programación. Duración orientativa: 20–25 minutos, con una comprobación final de 2 minutos. Abrir con una observación ecológica que el grupo conozca.\n'+theory;
}
// 2. Layers remain conceptual roles, not three scalar variables imposed on science.
{
  const s=slide('Tres capas, tres funciones',theory+'\nX, Y y Z pueden representar conjuntos de variables. Aquí se omite la notación vectorial para facilitar la lectura. Detección incluye error y esfuerzo de observación. Evitar que una diferencia natural entre contextos se lea automáticamente como degradación. Ejemplo verbal: cobertura baja en un ambiente naturalmente abierto frente a cobertura baja en un bosque de referencia. No introducir umbrales universales.');
  const rows=[['X','Contextual','Las condiciones de referencia','Clima, suelo, topografía y biogeografía',C.context],['Y','Detección','Las señales que observamos','Presencia, abundancia o cobertura medida',C.obs],['Z','Latente','La condición que inferimos','Integridad relativa al contexto, con incertidumbre',C.latent]];
  rows.forEach(([symbol,name,desc,example,color],i)=>{
    const y=173+i*139;
    txt(s,symbol,72,y,80,80,59,{bold:true,color});
    txt(s,name,181,y,275,45,32,{bold:true,color});
    txt(s,desc,505,y,680,45,30);
    txt(s,example,505,y+47,690,58,25,{color:C.muted});
  });
  txt(s,'Una misma señal puede tener interpretaciones distintas según el contexto.',72,613,1095,54,27,{bold:true});
}
// 3. Minimal generative representation, with diagnostic inference kept separate.
{
  const s=slide('Una representación generativa mínima',theory+'\nLa sección 4 propone p(X)p(Z|X)p(Y|X,Z). La sección 5 distingue alternativas causales y advierte que contexto no equivale a degradación. Mostrar X→Z como dependencia probabilística de esta representación, no como juicio de calidad ni mecanismo causal probado. En una implementación pueden separarse estado biótico y observación e incorporarse presiones. Inferir hacia Z no requiere invertir flechas.');
  tri(s,182,227,'',1.35);
  txt(s,'X  contexto',94,132,280,38,24,{color:C.context});
  txt(s,'Z  condición',81,550,280,38,24,{color:C.latent});
  txt(s,'Y  observaciones',370,453,280,42,24,{color:C.obs});
  txt(s,'Representar las señales',687,185,510,45,32,{bold:true});
  txt(s,'p(Y | X, Z)',688,246,490,57,41,{color:C.obs});
  txt(s,'Inferir la condición',687,354,510,45,32,{bold:true});
  txt(s,'p(Z | X, Y)',688,415,490,57,41,{color:C.latent});
  txt(s,'«|» se lee «dado». El diagnóstico\nno invierte las flechas.',687,494,520,85,27,{color:C.muted});
  txt(s,'X e Y observadas: relleno gris. Z latente: círculo blanco. Las flechas expresan dependencias del modelo.',72,617,1095,48,22,{color:C.muted});
}
// 4. Climate example starts with the two-node structure.
{
  const s=slide('Los componentes de una red bayesiana',climate+'\nDAG significa grafo dirigido acíclico. El grafo y las distribuciones locales definen la distribución conjunta. Una flecha no demuestra por sí sola causalidad. La ausencia de arco directo no implica independencia marginal; hay que estudiar separación-d con un conjunto de condicionamiento. C conserva la variable aCC original: no es una exposición local redefinida.');
  const c=node(s,'C',220,316,{r:61,color:C.context,size:48});
  const e=node(s,'E',502,316,{r:61,color:C.obs,size:48}); arrow(s,c,e);
  txt(s,'Cambio climático',95,406,255,47,25,{align:'center'});
  txt(s,'Pérdida de especies',374,406,255,47,25,{align:'center'});
  txt(s,'Estructura gráfica',729,173,465,47,32,{bold:true});
  txt(s,'Nodos = variables\nArcos = dependencias propuestas\nDAG = sin ciclos dirigidos',729,237,478,148,27);
  txt(s,'Estructura numérica',729,422,470,45,32,{bold:true});
  txt(s,'p(C, E) = p(C) p(E | C)',729,481,477,64,30);
  txt(s,'Ejemplo hipotético de Cafe-blog. La lectura causal necesita justificación adicional.',72,613,1100,52,24,{color:C.muted});
}
// 5. Original values, with native editable probability tables.
{
  const s=slide('Las tablas completan el grafo',climate+'\nC=presente tiene probabilidad .99 en el ejemplo hipotético. E|C usa .99 y .95 para E=presente. Cada fila de la tabla condicional suma uno. No interpretar .99 como estimación de la evidencia científica sobre el cambio climático. La diferencia entre .99 y .95 es .04. custom.fit asigna estos parámetros; no los estima con datos.');
  txt(s,'Distribución de C',74,166,430,47,30,{bold:true,color:C.context});
  table(s,[['Estado de C','p(C)'],['Presente','0.99'],['Ausente','0.01']],74,231,390,216,[245,145]);
  txt(s,'Distribución de E para cada estado de C',522,166,686,48,29,{bold:true,color:C.obs});
  table(s,[['C','E presente','E ausente'],['Presente','0.99','0.01'],['Ausente','0.95','0.05']],522,231,684,216,[240,222,222]);
  txt(s,'Cada distribución suma 1',75,487,1060,46,31,{bold:true});
  txt(s,'En R, bnlearn::custom.fit() combina el DAG con estas tablas.',75,548,1095,46,26);
  txt(s,'Todos los números son hipotéticos y se conservan del ejemplo original.',75,611,1095,48,24,{color:C.muted});
}
// 6. Extend the example and distinguish conditioning from intervention.
{
  const s=slide('Observar y actuar plantean consultas distintas',climate+'\nSe muestra el submodelo marginal de C,E,U,Eco. U tiene marginal .945 tras sumar sobre B en la red original; E y U son marginalmente independientes. Eco=plantacion si y solo si E y U están presentes. p(E)=.9896; p(E|Eco=natural)=.9896*.055/(1-.9896*.945)=.8395755. La intervención ideal en Eco corta E→Eco y U→Eco, por lo que p(E|do(Eco=natural))=.9896, bajo la interpretación causal hipotética del grafo. Eco=plantacion fija ambos padres y no sirve para ilustrar correlación. La cobertura no es un índice de integridad. Fuente técnica: https://www.bnlearn.com/documentation/man/causal.inference.html .');
  const c=node(s,'C',150,270,{r:39,color:C.context});
  const e=node(s,'E',351,270,{r:39,color:C.obs});
  const eco=node(s,'Eco',568,270,{r:48,observed:true,size:29});
  const u=node(s,'U',568,463,{r:39});
  arrow(s,c,e); arrow(s,e,eco); arrow(s,u,eco,'top','bottom');
  txt(s,'Cambio\nclimático',80,329,143,80,24,{align:'center'});
  txt(s,'Pérdida de\nespecies',272,329,160,80,24,{align:'center'});
  txt(s,'Tipo de\ncobertura',628,233,163,79,24);
  txt(s,'Aprovechamiento',457,521,242,48,24,{align:'center'});
  txt(s,'Probabilidad de E presente',830,171,374,80,30,{bold:true});
  txt(s,'Sin evidencia',830,283,330,38,25);
  txt(s,'0.9896',830,322,330,53,39,{bold:true});
  txt(s,'Observando Eco = natural',830,403,375,46,25);
  txt(s,'0.8396',830,449,330,53,39,{bold:true,color:C.obs});
  txt(s,'En este modelo hipotético, intervenir en Eco cambia su mecanismo y daría 0.9896.',72,607,1110,57,25,{color:C.muted});
}
// 7. Unroll the three-layer graph before introducing its compact notation.
{
  const s=slide('La misma estructura en varios sitios',theory+'\nIntroducción de repetición: cada sitio tiene su propio X_i, Y_i y Z_i. El índice i identifica sitios, no tiempos. La notación de un nodo resume conjuntos de variables. En esta simplificación los sitios comparten los parámetros θ del modelo de observación p(Y_i|X_i,Z_i;θ), implícitos en los tres dibujos. La independencia entre sitios es un supuesto adicional discutido en la diapositiva 9.');
  [1,2,3].forEach((n,i)=>{
    const left=99+i*390;
    txt(s,`Sitio ${n}`,left+16,168,255,48,31,{bold:true});
    tri(s,left+27,279,['','₁','₂','₃'][n],1.0);
  });
  txt(s,'Se repiten las variables y sus relaciones. Los valores pueden ser diferentes.',72,564,1115,49,28,{bold:true});
  txt(s,'Usaremos θ para los parámetros compartidos del modelo de observación.',72,622,1110,39,24,{color:C.muted});
}
// 8. The plate boundary is a native editable rectangle.
{
  const s=slide('Un plate abrevia esa repetición',theory+'\n'+plates+'\nConvención explícita: gris=observado, blanco=latente, cuadrado=parámetro fijado en este ejercicio. X_i,Y_i,Z_i se repiten para i=1,…,M. θ está fuera y gobierna la misma distribución observacional para todos los sitios; por eso su flecha llega a Y_i. Los parámetros de p(Z_i|X_i) se dejan implícitos. No afirmar que θ representa todos los parámetros. Si se infiere θ, debe recibir una distribución y representarse como variable aleatoria.');
  shape(s,'rect',90,268,573,331,'none',C.muted,2.3,'plate-sitios');
  const x=node(s,'Xᵢ',191,343,{r:39,color:C.context,observed:true});
  const z=node(s,'Zᵢ',191,501,{r:39,color:C.latent});
  const y=node(s,'Yᵢ',533,421,{r:39,color:C.obs,observed:true});
  const th=node(s,'θ',533,184,{r:25,square:true,size:32});
  arrow(s,x,z,'bottom','top'); arrow(s,x,y,'right','left'); arrow(s,z,y,'right','bottom'); arrow(s,th,y,'bottom','top');
  txt(s,'Parámetros compartidos\nde p(Yᵢ | Xᵢ, Zᵢ)',86,149,391,88,28,{bold:true});
  txt(s,'i = 1, …, M sitios',305,550,315,39,25,{bold:true});
  txt(s,'Leyenda',735,162,440,49,33,{bold:true});
  node(s,'',757,252,{r:19,observed:true}); txt(s,'Círculo gris: observado',807,230,396,48,26);
  node(s,'',757,324,{r:19}); txt(s,'Blanco: variable no observada',807,302,396,66,26);
  node(s,'',757,396,{r:17,square:true}); txt(s,'Cuadrado: parámetro fijado',807,374,401,67,26);
  txt(s,'Flecha: dependencia del modelo\nRectángulo: repetición por índice',735,468,475,103,26);
  txt(s,'Xᵢ contexto, Yᵢ observaciones y Zᵢ condición del sitio i. M es el número de sitios.',72,622,1110,40,23,{color:C.muted});
}
// 9. State the actual implications and assumptions of the abbreviated model.
{
  const s=slide('Qué se comparte y qué se repite',theory+'\n'+plates+'\nLa factorización p(Y_1,…,Y_M | X_1,…,X_M,Z_1,…,Z_M,θ)=∏_i p(Y_i|X_i,Z_i,θ) presupone observaciones independientes entre sitios condicionadas en las variables mostradas y parámetros. El plate solo abrevia replicación: las dependencias se determinan por las flechas y el modelo probabilístico. No hay garantía de independencia marginal si θ se trata como aleatorio y se integra. Aquí θ se fija. No presentar replicación por sitio como transición temporal.');
  txt(s,'Dentro del plate',74,183,491,48,32,{bold:true,color:C.context});
  txt(s,'Xᵢ, Yᵢ y Zᵢ pertenecen al sitio i.\nM sitios producen M copias\nde la estructura local.',74,257,510,151,30);
  txt(s,'Fuera del plate',708,183,493,48,32,{bold:true,color:C.latent});
  txt(s,'θ se usa en todos los sitios.\nCompartir parámetros permite\ncomparar con una regla común.',708,257,498,151,30);
  txt(s,'Supuesto de esta simplificación',74,463,1120,46,30,{bold:true});
  txt(s,'Las observaciones de distintos sitios son independientes dadas X, Z y θ.\nLa dependencia espacial exigiría ampliar el modelo.',74,519,1110,88,27);
  txt(s,'Un plate cuenta repeticiones. Una transición temporal requiere relaciones entre tiempos.',74,625,1090,42,23,{color:C.muted});
}
// 10. One integrated comprehension question; answer belongs to the instructor notes.
{
  const s=slide('Comprobación: un sitio más',theory+'\nRespuesta esperada: M pasa de 3 a 4. Se añade una copia X_4,Z_4,Y_4, con las mismas relaciones. Se registran X_4 y Y_4, se infiere la distribución p(Z_4|X_4,Y_4;θ) y se mantiene θ compartido mientras se mantenga el modelo fijado. El color gris indica evidencia observada, no certeza de medición sin error. Inferir la condición no invierte el DAG. No se asigna automáticamente un escalar de IIE ni se redefine θ por sitio. Pedir una explicación de 30–60 segundos por pareja antes de mostrar el resultado. Si se aprende θ con nuevos datos, se actualiza un parámetro común, no necesariamente uno por sitio.');
  txt(s,'Tenemos datos de tres sitios.\nAhora medimos el contexto y las señales\nde un cuarto sitio.',74,168,1066,143,35);
  txt(s,'¿Qué cambia en el plate, qué se mantiene\ncompartido y qué debemos inferir?',74,369,1095,130,41,{bold:true,color:C.latent});
  txt(s,'M = 3',92,556,242,56,37,{bold:true});
  txt(s,'M = 4',451,556,242,56,37,{bold:true,color:C.context});
  txt(s,'X₄ e Y₄ observadas',810,556,380,56,30);
  txt(s,'Explica tu respuesta usando Xᵢ, Yᵢ, Zᵢ y θ.',74,630,1000,39,24,{color:C.muted});
}

await fs.mkdir(TMP,{recursive:true}); await fs.mkdir(path.dirname(OUT),{recursive:true});
const candidate=path.join(TMP,'candidate-r2.pptx');
await (await PresentationFile.exportPptx(p)).save(candidate);
const requirements={explicitTotalSlideCount:10,requiredNativeTableOwnerSlides:[5],requiredNativeChartOwnerSlides:[]};
const receipt=await finalizePresentation({...requirements,workspaceDir:ROOT,candidatePath:candidate,finalPath:OUT,pythonExecutable:PYTHON,
  integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit','--require-native-table-slide','5'],
  fontPolicy:{basis:'design',families:[FONT]},verifyArtifactToolImport:true,
  receiptPath:path.join(TMP,`${path.basename(OUT)}.validation.json`)});
console.log(JSON.stringify(receipt));
// Render the FINAL reimported file, not merely the pre-export model.
const finalDeck=await PresentationFile.importPptx(await FileBlob.load(OUT));
for (const [i,s] of finalDeck.slides.items.entries()) {
  const blob=await finalDeck.export({slide:s,format:'png',scale:1});
  await fs.writeFile(path.join(TMP,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));
}
console.log(`FINAL ${OUT}`);
