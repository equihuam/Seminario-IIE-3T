import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { PresentationFile, FileBlob } from '@oai/artifact-tool';

const root = process.cwd();
const tmp = path.join(root, '.local/slides-intro');
const skill = process.env.PRESENTATIONS_SKILL_DIR;
const python = process.env.PRESENTATIONS_PYTHON;
const { finalizePresentation } = await import(pathToFileURL(path.join(skill, 'container_tools/artifact_tool_utils.mjs')).href);
const source = path.join(root, 'output/Introduccion-iie3t-redes-bayesianas-v1.pptx');
const final = path.join(root, 'output/Introduccion-iie3t-redes-bayesianas-v2.pptx');
const deck = await PresentationFile.importPptx(await FileBlob.load(source));
const inspected = await deck.inspect({kind:'slide,textbox,shape',maxChars:200000});
await fs.writeFile(path.join(tmp,'v2-before.ndjson'),inspected.ndjson);
const records = inspected.ndjson.split('\n').filter(Boolean).map(s=>JSON.parse(s));

function replaceText(index, old, value, height) {
  const found=records.filter(r=>r.slideIndex===index && r.text===old);
  if(found.length!==1) throw new Error(`Expected one text box on slide ${index+1}: ${old}`);
  const shape=deck.resolve(found[0].id); shape.text=value;
  if(height) shape.position={...found[0].position,height};
  return shape;
}

const pending = '\nAcuerdo didáctico del equipo, 2026-10-08: existen argumentos conceptuales para omitir el arco X→Z, pero no una solución definitiva. La línea discontinua es una anotación editorial de incertidumbre estructural, no una flecha débil ni un nuevo tipo de dependencia probabilística. Para calcular, cada modelo debe incluir o excluir el arco de forma explícita. Las flechas continuas describen la estructura de trabajo y tampoco prueban causalidad. Mencionar esta incertidumbre brevemente en la introducción. Reservar el contraste entre modelos para una actividad posterior, tras estudiar separación-d, identificación de variables latentes y validación. No presentar un contraste no significativo como demostración de independencia.';

let changed=0;
for(const index of [2,6,7]) {
  const slide=deck.slides.items[index];
  const before=await deck.export({slide,format:'png',scale:1});
  await fs.writeFile(path.join(tmp,`v2-before-${index+1}.png`),new Uint8Array(await before.arrayBuffer()));
  const targets=records.filter(r=>r.slideIndex===index && r.kind==='shape' &&
    /connector/i.test(r.geometry||'') && r.position.width<0.1 &&
    r.position.height>60 && (index!==7 || r.position.left<250));
  if(targets.length!==(index===6?3:1)) throw new Error(`Unexpected connector count on ${index+1}`);
  for(const r of targets) {
    deck.resolve(r.id).line={style:'dashed',fill:'#52656A',width:2.5}; changed++;
  }
  slide.speakerNotes.text=slide.speakerNotes.text+pending;
}
if(changed!==5) throw new Error('Expected five X→Z arrows.');

replaceText(2,'X e Y observadas: relleno gris. Z latente: círculo blanco. Las flechas expresan dependencias del modelo.',
  'X → Z: hay argumentos para omitirlo, pero la decisión sigue abierta.\nTrazo discontinuo = relación en evaluación.',55);
replaceText(6,'Usaremos θ para los parámetros compartidos del modelo de observación.',
  'θ reúne parámetros compartidos de observación.\nTrazo discontinuo: relación en evaluación.',53);
replaceText(7,'Flecha: dependencia del modelo\nRectángulo: repetición por índice',
  'Flecha: dependencia propuesta\nTrazo discontinuo: en evaluación\nRectángulo: repetición por índice',103);

const candidate=path.join(tmp,'candidate-v2.pptx');
await (await PresentationFile.exportPptx(deck)).save(candidate);
const result=await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,
  explicitTotalSlideCount:10,requiredNativeTableOwnerSlides:[5],requiredNativeChartOwnerSlides:[],
  pythonExecutable:python,
  integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','5'],
  fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,
  receiptPath:path.join(tmp,'v2.validation.json')});
console.log(JSON.stringify({finalPath:result.finalPath,sha256:result.finalSha256}));
const finalDeck=await PresentationFile.importPptx(await FileBlob.load(final));
for(const [i,slide] of finalDeck.slides.items.entries()) {
  const png=await finalDeck.export({slide,format:'png',scale:1});
  await fs.writeFile(path.join(tmp,`v2-slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));
}
console.log('Ten final slides rendered.');
