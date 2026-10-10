import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Presentation, PresentationFile, FileBlob} from '@oai/artifact-tool';

// Ejecutar una copia en .local/slides-intro, desde la raíz del proyecto.
const ROOT=process.cwd();
const TMP=path.join(ROOT,'.local/slides-intro/v5-dbn-nueva');
const SKILL=process.env.PRESENTATIONS_SKILL_DIR;
const PYTHON=process.env.PRESENTATIONS_PYTHON;
if(!SKILL || !PYTHON) throw Error('Configurar PRESENTATIONS_SKILL_DIR y PRESENTATIONS_PYTHON');
const OUT=path.join(ROOT,'output',process.env.DECK_FILENAME || 'Introduccion-iie3t-redes-bayesianas-v5-dbn-nueva.pptx');
const p=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#FAFAF7',ink:'#18343A',muted:'#52656A',x:'#087E86',y:'#AA6717',z:'#73528C',gray:'#E3E9E8',white:'#FFFFFF'};
const FONT='Arial'; let serial=0;
const theory='Fuente: iie-teoria/iie-teoria.qmd, documento de trabajo del equipo, versión 2e3d3773b0f67a09a9f0935804ccf79d19450ca4, §§3–5, 8 y 21. Marco conceptual y propuestas, no validación empírica de este ejemplo. Antecedente didáctico: presentación v3 y docs/FUENTES-Y-DECISIONES.md, D14–D15.';
const tentative='El arco X→Z permanece en evaluación. Su trazo discontinuo es una anotación editorial de incertidumbre estructural. Cada modelo que se calcule incluye o excluye ese arco. Los arcos continuos tampoco demuestran causalidad. No resolver aquí la cuestión mediante una prueba no significativa.';
const toy='Ejemplo hipotético creado para enseñar actualización bayesiana. X=x es un contexto fijado. Z tiene estados favorable y alterada; Y es una observación de regeneración con estados alta y baja. Se estipula P(Z=favorable|X=x)=0.5, P(Y=alta|Z=favorable,X=x)=0.8 y P(Y=alta|Z=alterada,X=x)=0.2. Las categorías no son clases expertas del IIE, no establecen umbrales de campo y no representan una calibración empírica. Se simplifican deliberadamente estado biótico real y proceso de observación dentro de la distribución de Y.';
function box(s,g,x,y,w,h,fill='none',stroke='none',lw=0){return s.shapes.add({geometry:g,name:`obj-${++serial}`,position:{left:x,top:y,width:w,height:h},fill,line:{fill:stroke,width:lw,style:'solid'}});}
function text(s,str,x,y,w,h,size=28,color=C.ink,bold=false){const t=box(s,'textbox',x,y,w,h);t.text=str;t.text.style={typeface:FONT,fontSize:size,color,bold,wrap:'square',autoFit:'none',insets:0};return t;}
function slide(title,notes){const s=p.slides.add();s.background.fill=C.bg;text(s,title,64,40,1150,80,44,C.ink,true);text(s,String(p.slides.items.length).padStart(2,'0'),1170,673,45,26,18,C.muted);s.speakerNotes.text=notes;return s;}
function foot(s,str){text(s,str,64,627,1120,40,23,C.muted);}
function node(s,label,x,y,r=48,color=C.ink,observed=false,square=false){const n=box(s,square?'rect':'ellipse',x-r,y-r,r*2,r*2,observed?C.gray:C.white,color,3);n.text=label;n.text.style={typeface:FONT,fontSize:30,bold:true,color,alignment:'center',verticalAlignment:'middle',insets:0};return n;}
function edge(s,a,b,from='right',to='left',dashed=false){return s.shapes.connect(a,b,{kind:'straight',fromSide:from,toSide:to,line:{fill:C.muted,width:2.7,style:dashed?'dashed':'solid'},tail:{type:'triangle',width:'med',length:'med'}});}
function table(s,values,x,y,w,h,widths,size=26){const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:h,values,columnWidths:widths});t.borders.assign({fill:'#CDD7D5',width:1,style:'solid'});for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){const cell=t.getCell(r,c);cell.fill=r===0?C.ink:r%2?C.white:'#EDF1EE';cell.text.style={typeface:FONT,fontSize:size,color:r===0?C.white:C.ink,bold:r===0,verticalAlignment:'middle',alignment:c===0?'left':'center',insets:12};}return t;}
function tri(s,x,y){const a=node(s,'X',x,y,49,C.x,true),z=node(s,'Z',x,y+230,49,C.z),b=node(s,'Y',x+270,y+115,49,C.y,true);edge(s,a,z,'bottom','top',true);edge(s,a,b,'right','left');edge(s,z,b,'right','left');return {a,z,b};}

// 01. Reutilizar la portada aprobada sin alterarla ni tratarla como DAG formal.
{
 const s=slide('Integridad ecosistémica y diagnóstico',theory+'\nObjetivos: distinguir contexto, detección y condición; explicar una actualización del diagnóstico; reconocer qué se repite por sitio y qué requiere tiempo. Público sin formación numérica formal. Ruta orientativa de 30–40 minutos, adaptable. La diapositiva 12 puede reservarse para una segunda conversación. Portada: presentaciones/img/portada_integridad_redes_es.jpg, ilustración generada y aprobada en P043. Su red es evocativa, no un modelo formal del IIE.');
 const bytes=await fs.readFile(path.join(ROOT,'presentaciones/img/portada_integridad_redes_es.jpg'));
 s.images.add({blob:bytes,contentType:'image/jpeg',alt:'Ilustración existente de integridad ecosistémica y redes',fit:'contain',position:{left:165,top:133,width:950,height:530}});
 text(s,'Seminario IIE-3T',64,675,400,25,19,C.muted);
}
// 02. Un caso que se mantiene durante la primera parte.
{
 const s=slide('Dos bosques, una pregunta',theory+'\nCaso hipotético, sin datos ni umbrales definidos. Pedir una respuesta inicial de treinta segundos. Una regeneración observada baja puede sugerir deterioro, pero también depende de historia, contexto, esfuerzo y error de observación. La actividad pide reconocer información faltante, no etiquetar un bosque como degradado.');
 table(s,[['Observación','Bosque A','Bosque B'],['Cobertura del dosel','Semejante','Semejante'],['Regeneración observada','Abundante','Escasa']],64,157,1150,252,[430,360,360],30);
 text(s,'¿Tienen la misma condición?',64,460,1100,64,42,C.z,true);
 text(s,'¿Qué más necesitaríamos saber para interpretarlos?',64,548,1100,58,30);
 foot(s,'Caso hipotético para conversar sobre señales y diagnóstico');
}
// 03. Analogía funcional, breve y sin definir una normalidad universal.
{
 const s=slide('La salud como analogía del diagnóstico',theory+'\nFuente específica: §3.4, correspondencia funcional entre diagnóstico médico y ecosistémico. También: Equihua Zamora, Miguel; Pérez-Maqueo, Octavio; Equihua Benítez, Ana, Integridad ecosistémica: el tejido de la vida y la salud, manuscrito referencias/Salud_e_integridad-entrrega-2.docx, pasaje de apariencia corporal y campo de golf. Dos personas de aspecto musculoso pueden requerir pruebas para distinguir su condición. El verdor de un campo de golf no permite estimar cuánto conserva de los procesos del ecosistema reemplazado. La analogía no implica un organismo literal ni un estado sano universal. Mantener como preguntas distintas diagnóstico, etiología, pronóstico y tratamiento. Evitar introducir autopoiesis como requisito formal del IIE operativo. El énfasis de Margulis en la simbiosis invita a considerar a los organismos junto con sus asociaciones con otros seres vivos. Las relaciones con microorganismos pueden contribuir a su nutrición y a su capacidad de vivir en determinados ambientes. Esta perspectiva ayuda a formular preguntas sobre funciones que dependen de relaciones. Fuentes: O’Malley, M. A. (2017), From endosymbiosis to holobionts: Evaluating a conceptual legacy, Journal of Theoretical Biology 434:34–41, https://doi.org/10.1016/j.jtbi.2017.03.008; Koide, R. T. (2023; en línea 2022), On Holobionts, Holospecies, and Holoniches, Microbial Ecology 85:1143–1149, https://doi.org/10.1007/s00248-022-02005-9. El legado conceptual y los ejemplos funcionales motivan preguntas; no validan por sí mismos el IIE ni implican que todo ecosistema sea un organismo.');
 text(s,'Lo observable',64,170,485,50,34,C.y,true);
 text(s,'Signos y pruebas\n\nCobertura medida\nRegeneración registrada',64,242,490,220,30);
 text(s,'Lo que inferimos',696,170,520,50,34,C.z,true);
 text(s,'Una condición subyacente\n\nDiagnóstico relativo al contexto\nIncertidumbre explícita',696,242,520,220,30);
 text(s,'Las funciones también dependen de asociaciones',64,529,1120,68,36,C.ink,true);
 foot(s,'Perspectiva simbiótica de Margulis: O’Malley (2017) y Koide (2023)');
}
// 04. Ontología mínima fiel al modelo.
{
 const s=slide('Las tres capas del modelo IIE-3T',theory+'\nX, Y y Z pueden representar conjuntos de variables. La capa de detección reúne atributos medidos; sensores y muestreo pertenecen al proceso de observación. Separar condición, estado biótico real, existencias y observaciones cuando la pregunta lo requiera. Estructura, composición y función describen atributos, no son los nombres de las capas.');
 const rows=[['X','Contextual','Permite interpretar las señales','Clima, suelo y biogeografía',C.x],['Y','Detección','Reúne lo que medimos','Cobertura y regeneración observadas',C.y],['Z','Latente','Representa la condición inferida','Diagnóstico con incertidumbre',C.z]];
 rows.forEach(([a,b,c,d,col],i)=>{const y=162+i*143;text(s,a,64,y,70,80,60,col,true);text(s,b,164,y+5,360,55,34,col,true);text(s,c,547,y,665,48,30);text(s,d,547,y+52,665,65,26,C.muted);});
 foot(s,'El contexto natural y las presiones humanas cumplen funciones distintas');
}
// 05. Unir pensamiento sistémico y conjunta sin afirmar que todo depende de todo.
{
 const s=slide('Pensamiento sistémico y red bayesiana',theory+'\nLa analogía de la pecera procede del manuscrito de Equihua Zamora, Pérez-Maqueo y Equihua Benítez, referencias/Salud_e_integridad-entrrega-2.docx, capítulo ¿Por qué hay ecosistemas distintos? Acumulaciones, flujos y retardos: https://donellameadows.org/systems-thinking-resources/. Un cambio de alimentación puede producir efectos posteriores en la calidad del agua. Una señal aislada puede ser insuficiente, sin implicar que siempre fracase. Aquí se usa como motivación de interdependencias, no como validación de una arquitectura causal. Una red bayesiana especifica una distribución conjunta sobre las variables incluidas. El DAG expresa una factorización e independencias supuestas. Un DAG no garantiza inferencia exacta eficiente. Formalización opcional para el facilitador: P(V_1,...,V_n)=producto_i P(V_i|padres(V_i)). La conjunta refiere a las variables incluidas, no al ecosistema completo. Los parámetros completan la especificación del grafo.');
 s.images.add({blob:await fs.readFile(path.join(ROOT,'presentaciones/img/sistemico_pecera_microcosmos_es.jpg')),contentType:'image/jpeg',alt:'Ilustración de una pecera con organismos y procesos conectados',fit:'contain',position:{left:64,top:140,width:540,height:275}});
 text(s,'Una pecera',64,449,540,46,32,C.x,true);
 text(s,'Los desechos se acumulan\nLos efectos pueden aparecer más tarde',64,511,540,93,28);
 text(s,'Una representación del sistema',670,161,540,88,34,C.ink,true);
 text(s,'Elegimos variables y relaciones\nAsignamos probabilidades a sus\ncombinaciones de valores',670,271,540,132,28);
 text(s,'La distribución conjunta',670,449,540,46,32,C.z,true);
 text(s,'Reúne las variables incluidas\ny sus combinaciones posibles',670,511,540,93,28);
 foot(s,'DAG: grafo dirigido acíclico. Sus flechas no demuestran causalidad');
 s.speakerNotes.text += '\nImagen reutilizada: presentaciones/img/sistemico_pecera_microcosmos_es.jpg, generada para v4. Ilustración de interconexiones, no balance químico validado. Sus rótulos pequeños no constituyen contenido exigible; términos como autosostenible no demuestran cierre material ni autosuficiencia de una pecera.';
}
// 06. Grafo editable, dependencia tentativa y dos sentidos de lectura.
{
 const s=slide('Generar señales e inferir condición',theory+'\n'+tentative+'\nSimplificación pedagógica: X y Z parametrizan la distribución de Y. La inferencia p(Z|X,Y) aplica Bayes y no invierte el DAG. El nodo Z es condición latente, no equivale al estado biótico real. En una versión más detallada se separan estado real y observación.');
 tri(s,175,225);
 text(s,'Contexto',80,147,205,45,25,C.x);
 text(s,'Condición',76,522,205,45,25,C.z);
 text(s,'Observaciones',345,449,280,45,25,C.y);
 text(s,'Proceso generativo',690,165,510,45,32,C.ink,true);
 text(s,'p(Y | X, Z)',690,227,490,62,43,C.y);
 text(s,'Diagnóstico',690,342,510,45,32,C.ink,true);
 text(s,'p(Z | X, Y)',690,404,490,62,43,C.z);
 text(s,'«|» significa «dado»\nGris: observado. Blanco: latente',690,512,515,76,25,C.muted);
 foot(s,'X → Z discontinuo: relación en evaluación, no un tipo especial de probabilidad');
}
// 07. Distribuciones locales nativas y editables.
{
 const s=slide('Las probabilidades completan el grafo',theory+'\n'+toy+'\nDefinir primero los estados y leer una fila completa. Al observar, comparamos qué tan esperable sería esa señal bajo cada condición. Este es el puente intuitivo a la verosimilitud. Comprobación: si la regeneración no es alta, ¿qué probabilidad queda en cada fila? Respuesta: 0.2 y 0.8. La probabilidad de una observación bajo una condición no es automáticamente la probabilidad de esa condición dada la observación.');
 text(s,'En un mismo contexto X = x',64,143,1110,50,30,C.x,true);
 table(s,[['Condición Z','Y alta','Y baja'],['Favorable','0.80','0.20'],['Alterada','0.20','0.80']],64,218,1150,245,[540,305,305],30);
 text(s,'¿Qué tan esperable es la señal bajo cada condición?',64,501,1110,65,33,C.ink,true);
 foot(s,'Y = regeneración observada. Números hipotéticos, ajenos a una calibración del IIE');
}
// 08. Cálculo verificable, mismo caso, sin ocultar el prior.
{
 const s=slide('Una observación cambia el diagnóstico',theory+'\n'+toy+'\nA priori: probabilidades antes de incorporar esta observación, que pueden apoyarse en datos anteriores. A posteriori: probabilidades actualizadas con esa evidencia según el modelo. El diagnóstico cambia nuestro conocimiento, no implica un cambio del ecosistema. Cálculo: P(Y=alta|x)=0.5×0.8+0.5×0.2=0.5. P(Z=favorable|Y=alta,x)=0.4/0.5=0.8; alterada=0.2. Con Y=baja, favorable=0.2. Si el prior favorable fuese 0.2, la misma observación daría 0.16/(0.16+0.16)=0.5. Esta sensibilidad permite explicar el papel del conocimiento previo sin afirmar que una única señal sea diagnóstica por sí sola.');
 text(s,'Nueva evidencia: regeneración alta',64,145,1120,50,32,C.y,true);
 table(s,[['Estado de Z','A priori','A posteriori'],['Favorable','0.50','0.80'],['Alterada','0.50','0.20']],64,218,1150,222,[470,340,340],30);
 text(s,'Favorable: 0.50 × 0.80 = 0.40',64,489,554,52,27,C.z,true);
 text(s,'Alterada: 0.50 × 0.20 = 0.10',669,489,545,52,27,C.muted,true);
 text(s,'p(favorable | Y alta, x) = 0.40 / (0.40 + 0.10) = 0.80',64,554,1120,56,30);
 foot(s,'Ejemplo hipotético. 0.80 es probabilidad del estado, no «80 % de integridad»');
}
// 09. Transición a gestión sin saltos causales.
{
 const s=slide('Diagnóstico y decisiones de gestión',theory+'\nFuente: §16.2 y revisión conceptual del ejemplo climático. La distribución observacional no identifica por sí sola efectos de intervención. El grafo puede ayudar a formular qué medir y qué hipótesis contrastar. No toda variable informativa es manipulable. Distinguir además una evaluación causal de una decisión, que requiere objetivos, costos y restricciones.');
 text(s,'¿Qué condición sugieren\nlas observaciones?',64,170,520,118,38,C.z,true);
 text(s,'Actualizar el diagnóstico\ncon contexto y evidencia',64,333,510,100,30);
 text(s,'¿Qué ocurriría al reducir\nla extracción?',694,170,520,118,38,C.x,true);
 text(s,'Justificar mecanismos causales\ny comparar posibles acciones',694,333,520,100,30);
 text(s,'La segunda pregunta exige supuestos adicionales',64,531,1120,69,36,C.ink,true);
 foot(s,'Una nueva medición modifica lo que sabemos; una intervención modifica un mecanismo');
}
// 10. Plate como notación de repetición, con parámetro global.
{
 const s=slide('Un plate representa muchos sitios',theory+'\n'+tentative+'\nAntecedente: v3, diapositivas 7–9. i recorre M sitios. θ representa aquí únicamente parámetros compartidos de p(Y_i|X_i,Z_i). El rectángulo expresa repetición; no impone por sí mismo independencia espacial. En esta simplificación las observaciones son independientes entre sitios dadas las condiciones, contextos y parámetros. La evaluación del modelo debe considerar dependencia espacial si existe.');
 box(s,'rect',64,208,564,385,'none',C.muted,2);
 const x=node(s,'Xᵢ',159,302,42,C.x,true),z=node(s,'Zᵢ',159,482,42,C.z),y=node(s,'Yᵢ',462,394,42,C.y,true),th=node(s,'θ',462,157,32,C.ink,false,true);
 edge(s,x,z,'bottom','top',true);edge(s,x,y,'right','left');edge(s,z,y,'right','left');edge(s,th,y,'bottom','top');
 text(s,'i = 1, …, M sitios',86,546,440,39,26,C.ink,true);
 text(s,'Dentro del rectángulo',694,184,510,47,32,C.ink,true);
 text(s,'Un contexto Xᵢ\nObservaciones Yᵢ\nUna condición Zᵢ por inferir',694,254,510,164,29);
 text(s,'θ se comparte entre sitios',694,464,510,49,32,C.x,true);
 text(s,'Repetir el modelo permite que\ncambien los datos y el diagnóstico',694,528,510,74,26);
 foot(s,'Gris: observado. Blanco: latente. θ: parámetro fijado. Arco discontinuo: en evaluación');
}
// 11. Evidencia cartográfica original, no una ilustración generada.
{
 const s=slide('El mismo modelo en los píxeles de México',theory+'\nFuente gráfica: img/Mapa_México_Página_3.png, original del equipo usado en v3, D15; rotulado 2018. Se conserva completa su leyenda y proporciones. No inferir resolución, fórmula o validación del mapa a partir de esta imagen. La escala 0–1 del índice no se redefine como probabilidad. El mapa ilustra la aplicación repetida, no verifica aquí el DAG operativo.');
 s.images.add({blob:await fs.readFile(path.join(ROOT,'img/Mapa_México_Página_3.png')),contentType:'image/png',alt:'Mapa original del equipo de integridad ecosistémica de México, 2018, con leyenda',fit:'contain',position:{left:46,top:137,width:753,height:538}});
 text(s,'Entradas por píxel',848,174,365,72,32,C.x,true);
 text(s,'Contexto y señales\nlocales',848,261,365,98,29);
 text(s,'Modelo compartido',848,387,365,72,32,C.z,true);
 text(s,'Los valores de entrada\npueden producir\ndiagnósticos diferentes',848,474,365,129,29);
}
// 12. Profundización opcional: jerarquía contextual.
{
 const s=slide('Contexto compartido, señales locales',theory+'\n'+tentative+'\nProfundización opcional, antecedente v3 diapositiva 11 y D15. j recorre J zonas o clases; i recorre n_j píxeles de j. Cada píxel pertenece a una sola clase en esta simplificación. X_j es el componente compartido del contexto, otras covariables pueden variar localmente. Las clases pueden ser discontinuas; no se infieren efectos aleatorios ni independencia espacial de la notación. θ reúne parámetros compartidos de observación.');
 box(s,'rect',64,202,587,411,'none',C.x,2);box(s,'rect',88,369,533,186,'none',C.muted,2);
 const x=node(s,'Xⱼ',171,291,39,C.x,true),z=node(s,'Zᵢⱼ',171,455,39,C.z),y=node(s,'Yᵢⱼ',518,455,39,C.y,true),th=node(s,'θ',518,150,30,C.ink,false,true);
 edge(s,x,z,'bottom','top',true);edge(s,x,y,'right','top');edge(s,z,y);edge(s,th,y,'bottom','top');
 text(s,'i = 1, …, nⱼ píxeles',108,505,390,38,24);text(s,'j = 1, …, J zonas o clases',84,570,515,35,24,C.x,true);
 text(s,'Un componente de contexto Xⱼ\npara la zona o clase j',709,210,503,102,29,C.x,true);
 text(s,'Observaciones Yᵢⱼ y condición Zᵢⱼ\npara cada píxel i',709,365,503,112,29);
 text(s,'Parámetros θ compartidos',709,521,503,57,30,C.z,true);
 foot(s,'Compartir contexto no obliga a inferir la misma condición ni garantiza independencia espacial');
}
// 13. DBN causal hipotética explícita con retroalimentación entre tiempos.
{
 const s=slide('Retroalimentación entre vegetación y suelo',theory+'\nFuente: iie-teoria §§12–14 y docs/REVISION-CONCEPTUAL-CLIMA.md. Murphy, Kevin P. (2002), Dynamic Bayesian Networks, introducción y §2, https://www.cs.ubc.ca/~murphyk/Papers/dbnchapter.pdf. Las DBN permiten representar influencias retardadas sin ciclos dirigidos en el grafo desplegado. La aciclicidad no garantiza inferencia exacta sencilla; existen métodos exactos y aproximados. Esquema hipotético para ilustrar una DBN, no implementación del IIE. V es vegetación y S es humedad del suelo. V_t→S_(t+1) y S_t→V_(t+1) representan influencias recíprocas retardadas propuestas. Para un modelo ejecutable faltan distribución inicial, probabilidades de transición, observación y justificación de retardos; persistencia propia y causas externas pueden añadirse. El grafo desplegado sigue siendo acíclico. Una actualización de evidencia en una red estática no constituye una transición temporal.');
 text(s,'Tiempo t',285,123,250,42,29,C.x,true);text(s,'Tiempo t + 1',819,123,300,42,29,C.x,true);
 const v0=node(s,'Vₜ',350,198,35,C.y),s0=node(s,'Sₜ',350,282,35,C.x),v1=node(s,'Vₜ₊₁',900,198,35,C.y),s1=node(s,'Sₜ₊₁',900,282,35,C.x);
 for(const [n,col] of [[v0,C.y],[s0,C.x],[s1,C.x],[v1,C.y]]) n.text.style={typeface:FONT,fontSize:24,bold:true,color:col,alignment:'center',verticalAlignment:'middle',insets:0};
 edge(s,v0,s1);edge(s,s0,v1);
 text(s,'Vegetación',64,177,240,36,26,C.y);text(s,'Humedad del suelo',64,257,260,70,26,C.x);
 text(s,'Vegetación',979,177,237,36,26,C.y);text(s,'Humedad\ndel suelo',979,247,237,74,26,C.x);
 s.images.add({blob:await fs.readFile(path.join(ROOT,'presentaciones/img/bosque-suelo-transicion-v5.png')),contentType:'image/png',alt:'Dos escenas del mismo bosque con raíces y humedad del suelo en momentos sucesivos',fit:'contain',position:{left:64,top:330,width:1152,height:320}});
 text(s,'Relaciones hipotéticas. El modelo requiere una distribución inicial y transiciones',64,667,1100,32,22,C.muted);
 s.speakerNotes.text += '\nIlustración creada para esta diapositiva: presentaciones/img/bosque-suelo-transicion-v5.png. Dos escenas evocan el mismo bosque y suelo en momentos sucesivos; los cambios visuales son ilustrativos, no observaciones ni predicciones. Sin letras ni flechas incrustadas: los símbolos y conexiones son objetos nativos editables. Los cruces de líneas no son nodos. V_t→S_(t+1) y S_t→V_(t+1) son hipótesis de influencias retardadas, no inferidas de la imagen. No se afirma recuperación ni degradación, ni que el fragmento incluya todas las dependencias de una DBN. Para explicitar un recorrido de retorno, continuar mentalmente V_t→S_(t+1)→V_(t+2).';
}
// 14. Regreso al producto operativo y sus límites.
{
 const s=slide('El IIE operativo y las ampliaciones',theory+'\nFuente específica: §21.3, 21.4, 21.7, 21.18–21.23 y 21.26. La experiencia operativa combina anclaje experto y dependencias entre indicadores representadas por TAN. No implica estimar primero un vector completo y después agregarlo. TAN significa Tree Augmented Naive Bayes y no identifica mecanismos causales ecológicos por sus arcos. Conservar incertidumbre y justificar clases, puntuaciones, referencia y validación independiente.');
 text(s,'Trayectoria operativa',64,171,515,49,34,C.ink,true);
 text(s,'Anclaje experto imperfecto\nDependencias entre indicadores\nSíntesis de una condición integrada',64,255,540,178,29);
 text(s,'Ampliaciones por explorar',695,171,516,90,34,C.z,true);
 text(s,'Dimensiones de condición\nServicios y beneficios\nDinámica temporal',695,282,510,159,29);
 text(s,'Cada producto necesita una definición\ny evidencia para sostener su interpretación',64,521,1120,102,37,C.ink,true);
}
// 15. Evaluación con respuestas en notas.
{
 const s=slide('Una explicación para un nuevo sitio',theory+'\nActividad de cinco minutos, en parejas. Respuestas esperadas: (1) cobertura semejante no basta; contexto, regeneración, otras señales y observación pueden modificar el diagnóstico. (2) El nuevo sitio añade X_(M+1),Y_(M+1),Z_(M+1) y cambia M a M+1; θ permanece compartido si aplicamos el mismo modelo fijado. (3) Observar nueva evidencia modifica la posterior, no los mecanismos ecológicos. Para evaluar extracción se requiere una estructura causal y para futuro una transición temporal. Recoger una explicación oral y una pregunta sin resolver. Si confunden señal y condición, volver a diapositiva 4; si invierten arcos, volver a 6.');
 text(s,'Un nuevo bosque tiene la misma cobertura\ny pertenece al mismo contexto',64,157,1100,104,38,C.ink,true);
 text(s,'1   ¿Qué observarías antes de emitir un diagnóstico?',64,324,1120,65,31);
 text(s,'2   ¿Qué cambia en el plate y qué sigue compartido?',64,422,1120,65,31);
 text(s,'3   ¿Qué falta para evaluar una acción de manejo?',64,520,1120,65,31);
 foot(s,'Cinco minutos en parejas. Explicar una respuesta y conservar una pregunta abierta');
}
// 16. Cierre conectado con la cosecha de ideas del seminario.
{
 const s=slide('Una pregunta para el semillero', 'Fuente: blog/semillero/index.qmd y plantilla.qmd, piloto acordado en P025–P027. Dar dos minutos para redactar una pregunta y por qué importa. La coordinación registra la atribución acordada. Revisor y didacta valoran la precisión conceptual y el aprendizaje posible. Una pregunta que requiera más desarrollo se vincula a una exploración, conservando su origen. No exigir completar una página.');
 text(s,'¿Qué propones explorar\ny por qué importa?',64,186,1110,166,55,C.z,true);
 text(s,'Una idea breve\nUn ejemplo, si ayuda\nUn siguiente paso posible',64,409,1100,151,31);
 foot(s,'Semillero del blog: fichas de hasta una página, con valoración del revisor y del didacta');
}

await fs.mkdir(TMP,{recursive:true});await fs.mkdir(path.dirname(OUT),{recursive:true});
const candidate=path.join(TMP,'candidate.pptx');await (await PresentationFile.exportPptx(p)).save(candidate);
const {finalizePresentation}=await import(pathToFileURL(path.join(SKILL,'container_tools/artifact_tool_utils.mjs')).href);
const receipt=await finalizePresentation({workspaceDir:ROOT,candidatePath:candidate,finalPath:OUT,pythonExecutable:PYTHON,
 integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),
 requiredNativeTableOwnerSlides:[2,7,8],requiredNativeChartOwnerSlides:[],
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit','--require-native-table-slide','2','--require-native-table-slide','7','--require-native-table-slide','8'],
 fontPolicy:{basis:'design',families:[FONT]},verifyArtifactToolImport:true,receiptPath:path.join(TMP,`${path.basename(OUT)}.validation.json`)});
console.log(JSON.stringify(receipt));
const deck=await PresentationFile.importPptx(await FileBlob.load(OUT));
for(const [i,s] of deck.slides.items.entries()){const b=await deck.export({slide:s,format:'png',scale:1});await fs.writeFile(path.join(TMP,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log(`FINAL ${OUT}`);
