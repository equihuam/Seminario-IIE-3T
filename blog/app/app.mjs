import {newRecord,validate,content,sameContent,markdown,sha256} from './model.mjs';
import {Api} from './api.mjs';
import {setView,showStep} from './wizard.mjs';
const $=id=>document.getElementById(id);
const fields=['author','title','question','motivation','example','sharing'];
const storeKey='iie-semilla-v0';
let record=newRecord(), receipt=null, api=null, busy=false, emailReady=false;
function message(id,text){$(id).textContent=text;}
function showRecord(){for(const f of fields) $(f).value=record[f];$('attachment').value='';$('consent').checked=false;message('draft-status',`v${record.version} · ${record.attachment?'Vuelve a seleccionar el documento.':'Registro local.'}`);setView('seed');showStep(0,{focus:false});}
function readRecord(){return content({...record,...Object.fromEntries(fields.map(f=>[f,$(f).value]))});}
async function capture(complete=true){
  const next=readRecord(); const file=$('attachment').files[0];
  if(file) next.attachment={name:file.name,size:file.size,sha256:await sha256(await file.arrayBuffer())};
  validate(next,complete);
  // Only received versions are immutable. Subsequent edits become a new version.
  if(receipt && !sameContent(next,record)){next.version=record.version+1;receipt=null;}
  record=next;return next;
}
function persist(){try{localStorage.setItem(storeKey,JSON.stringify({record,receipt}));return true;}catch{message('draft-status','No se pudo guardar en este navegador. Descarga el JSON para conservar tu trabajo.');return false;}}
function download(text,type,name){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function controls(){const connected=!!api&&emailReady;const signed=!!api?.session;$('login').disabled=!connected||busy||signed;$('verify').disabled=!connected||busy||signed;$('send').disabled=!signed||busy;$('refresh').disabled=!signed||busy;$('logout').hidden=!signed;$('receipt-download').hidden=!receipt;$('auth-panel').hidden=signed;}
async function action(work){if(busy)return;busy=true;controls();message('app-status','');try{await work();}catch(e){const text=e.message||'No fue posible completar la operación. Tu registro sigue disponible.';message('result',text);message('app-status',text);}finally{busy=false;controls();}}
function showReceipt(){if(receipt)message('result',`Recibida por el servidor: versión ${receipt.version}, acuse ${receipt.receipt_id}, ${new Date(receipt.received_at).toLocaleString('es-MX',{timeZone:'America/Mexico_City'})} (America/Mexico_City). Publicación pendiente de confirmación.`);else message('result',`La versión ${record.version} todavía no tiene un envío confirmado.`);controls();}
try{const saved=JSON.parse(localStorage.getItem(storeKey)||'null');if(saved){record=content(validate(saved.record,false));receipt=saved.receipt||null;}}catch{message('draft-status','No se pudo recuperar el borrador guardado. Puedes abrir tu copia JSON.');}
showRecord();showReceipt();
$('save').onclick=()=>action(async()=>{await capture(false);if(persist())message('draft-status',`Borrador v${record.version} guardado aquí. No enviado.`);showReceipt();});
for(const type of ['json','markdown']) $(type).onclick=()=>action(async()=>{await capture();persist();download(type==='json'?JSON.stringify({record,receipt},null,2):markdown(record),type==='json'?'application/json':'text/markdown',`semilla-${record.id}-v${record.version}.${type==='json'?'json':'md'}`);showReceipt();});
$('receipt-download').onclick=()=>download(JSON.stringify(receipt,null,2),'application/json',`acuse-${receipt.receipt_id}.json`);
$('new').onclick=()=>action(async()=>{if(!confirm('¿Crear otra semilla? Descarga o guarda primero la actual; el formulario se vaciará.'))return;record=newRecord();receipt=null;showRecord();message('result','Nueva semilla. Todavía no hay un envío confirmado.');});
$('import').onchange=()=>action(async()=>{const f=$('import').files[0];if(!f)return;if(f.size>100000)throw Error('El JSON supera el tamaño permitido.');const data=JSON.parse(await f.text());const incoming=content(validate(data.record||data,false));if(!confirm('¿Abrir este registro y sustituir el formulario actual?'))return;record=incoming;receipt=null;showRecord();message('result','Registro abierto. Consulta tus envíos para comprobar la versión recibida; un archivo importado no confirma recepción.');$('import').value='';});
$('login-form').onsubmit=e=>{e.preventDefault();action(async()=>{await api.otp($('email').value.trim());$('login-form').hidden=true;$('verify-form').hidden=false;message('auth-status','Si tu correo está registrado, recibirás un código. Revisa correo no deseado.');});};
$('change-email').onclick=()=>{$('login-form').hidden=false;$('verify-form').hidden=true;};
$('verify-form').onsubmit=e=>{e.preventDefault();action(async()=>{await api.verify($('email').value.trim(),$('otp').value.trim());$('otp').value='';message('auth-status',`Sesión iniciada: ${api.session.user.email}.`);await loadMine();});};
$('logout').onclick=()=>action(async()=>{try{await api.logout();}finally{message('auth-status','Sesión cerrada.');$('submissions').replaceChildren();$('login-form').hidden=false;$('verify-form').hidden=true;}});
$('seed-form').onsubmit=e=>{e.preventDefault();action(async()=>{await capture();persist();message('result','Enviando… espera el acuse antes de considerar recibida tu aportación.');receipt=await api.submit(record,$('attachment').files[0]);persist();showReceipt();try{await loadMine();}catch{message('submissions','Tu envío fue recibido, pero no se pudo actualizar la lista. Conserva el acuse.');}});};
function node(tag,text){const n=document.createElement(tag);n.textContent=text;return n;}
async function loadMine(){
  const rows=await api.mine();$('submissions').replaceChildren();
  if(!rows.length)$('submissions').append(node('p','Todavía no hay envíos recibidos para esta cuenta.'));
  for(const row of rows){const el=node('div','');el.className='submission';el.append(node('strong',`${row.original.title} · v${row.version}`),node('p',`Acuse: ${row.receipt_id}`));const open=node('button','Abrir esta versión');open.className='secondary';open.onclick=()=>action(async()=>{if(!confirm('¿Sustituir el formulario por esta versión recibida?'))return;record=content(validate(row.original));receipt={seed_id:row.seed_id,version:row.version,receipt_id:row.receipt_id,received_at:row.received_at};showRecord();showReceipt();persist();});el.append(open);$('submissions').append(el);}
}
$('refresh').onclick=()=>action(loadMine);
async function agenda(){try{const rows=await api.events();$('events').replaceChildren();message('agenda-status',rows.length?`Consultada el ${new Date().toLocaleString('es-MX',{timeZone:'America/Mexico_City'})} (America/Mexico_City).`:'No hay encuentros ni tareas publicados en este servicio. Consulta la coordinación; no se deducen fechas del horario habitual.');for(const r of rows){const el=node('article','');el.className='event';el.append(node('p',`${r.kind==='session'?'Encuentro':'Tarea'} · ${r.status}`),node('h3',r.title),node('p',r.body),node('p',r.starts_at?new Date(r.starts_at).toLocaleString('es-MX',{timeZone:'America/Mexico_City',dateStyle:'full',timeStyle:'short'}):'Fecha por confirmar'),node('small',`Actualizado: ${new Date(r.updated_at).toLocaleString('es-MX',{timeZone:'America/Mexico_City'})}`));$('events').append(el);}}catch(error){console.warn('Consulta de agenda:',error.name,error.message);message('agenda-status','No se pudo consultar la agenda. No se muestra una programación guardada como vigente.');}}
try{const response=await fetch('config.json',{cache:'no-store'});if(!response.ok)throw Error();const config=await response.json();if(config.supabaseUrl&&config.publishableKey){api=new Api(config);emailReady=config.emailAccessReady===true;message('connection',emailReady?'Servicio conectado · entra con tu correo al enviar.':'Base conectada · acceso por correo en preparación.');if(!emailReady)message('auth-status','La coordinación está preparando el acceso por correo. Ya puedes guardar y descargar tu semilla.');await agenda();}else message('connection','Modo local · prepara y descarga; envío central pendiente.');}catch{message('connection','Sin conexión al servicio · prepara y descarga tu semilla.');}
controls();
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
window.addEventListener('online',()=>{if(api)agenda();});
