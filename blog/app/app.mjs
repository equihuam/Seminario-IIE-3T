import {editShortcut} from './editing.mjs';
import './install.mjs';
import {initReadings} from './readings.mjs';
import {sessionCard} from './session-card.mjs';
import {splitAgenda} from './agenda-notes.mjs';
import {calendarText} from './calendar.mjs';
import {newRecord,validate,content,sameContent,markdown,sha256} from './model.mjs';
import {Api} from './api.mjs';
import {setView,showStep} from './wizard.mjs';
const $=id=>document.getElementById(id);
const fields=['author','title','question','motivation','example','sharing'];
const storeKey='iie-semilla-v0';
let record=newRecord(), receipt=null, api=null, busy=false, emailReady=false;
let receivedRecord=null;
let selectedAttachment=null;
let checkingFile=false;
function message(id,text){$(id).textContent=text;}
function showRecord(){selectedAttachment=null;checkingFile=false;for(const f of fields) $(f).value=record[f];$('attachment').value='';$('consent').checked=false;message('draft-status',`v${record.version} · ${record.attachment?'Vuelve a seleccionar el documento.':'Registro local.'}`);setView('seed');showStep(0,{focus:false});}
function readRecord(){return content({...record,attachment:selectedAttachment || record.attachment,...Object.fromEntries(fields.map(f=>[f,$(f).value]))});}
async function capture(complete=true){
  const next=readRecord(); const file=$('attachment').files[0];
  if(file) next.attachment={name:file.name,size:file.size,sha256:await sha256(await file.arrayBuffer())};
  validate(next,complete);
  if(receivedRecord) next.version=changedSinceReceipt(next)?receivedRecord.version+1:receivedRecord.version;
  record=next;return next;
}
function persist(){try{localStorage.setItem(storeKey,JSON.stringify({record,receipt,receivedRecord}));return true;}catch{message('draft-status','No se pudo guardar en este navegador. Descarga el JSON para conservar tu trabajo.');return false;}}
function download(text,type,name){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
let returnView=null;
const readings = document.querySelector('[data-view=readings]') ? initReadings(()=>api,()=>openAccess('readings')) : {load() {}, clear() {}};
function openAccess(view){returnView=view;setView('seed');showStep(7);($('verify-form').hidden?$('email'):$('otp')).focus();}
$('account-access').onclick=()=>openAccess(document.querySelector('.view:not([hidden])')?.id.replace('-view',''));
$('mine-access').onclick=()=>openAccess('mine');
function controls(){const connected=!!api&&emailReady;const signed=!!api?.session;for(const id of ['account-access','mine-access']){$(id).hidden=!connected||signed;$(id).disabled=busy;}const registered=receivedRecord && !changedSinceReceipt(readRecord());
$('send').hidden=!!registered || checkingFile;
$('consent').closest('label').hidden=!!registered;
$('consent').required=!registered;
$('send').textContent=receivedRecord?'Enviar nueva versión':'Enviar mi semilla';
message('send-hint',checkingFile?'Comprobando el adjunto…':registered?'Esta versión ya está registrada. Puedes descargar su acuse.':signed?'Marca la autorización para enviar.':connected?'Antes de enviar, vuelve a la tarjeta anterior y entra con el código de tu correo.':'El envío no está disponible. Guarda tu borrador o descarga el registro JSON.');$('login').disabled=!connected||busy||signed;$('verify').disabled=!connected||busy||signed;$('send').disabled=!signed||busy||!!registered||checkingFile;$('refresh').disabled=!signed||busy;$('logout').hidden=!signed;$('device-logout').hidden=!signed;$('receipt-download').hidden=!receipt;$('auth-panel').hidden=signed;}
function changedSinceReceipt(next){
  return fields.some(field=>next[field]!==receivedRecord[field]) ||
    ['name','size','sha256'].some(key=>next.attachment?.[key]!==receivedRecord.attachment?.[key]);
}
$('seed-form').addEventListener('input',controls);
$('attachment').addEventListener('change',async()=>{
  const file=$('attachment').files[0];
  selectedAttachment=null;
  checkingFile=!!file;
  controls();
  if(!file)return;
  try{
    const hash=await sha256(await file.arrayBuffer());
    if($('attachment').files[0]===file)selectedAttachment={name:file.name,size:file.size,sha256:hash};
  }catch{message('app-status','No se pudo leer el adjunto. Vuelve a seleccionarlo.');}
  finally{if($('attachment').files[0]===file){checkingFile=false;controls();}}
});
async function action(work){if(busy)return;busy=true;controls();message('app-status','');try{await work();}catch(e){const text=e.message||'No fue posible completar la operación. Tu registro sigue disponible.';message('result',text);message('app-status',text);}finally{busy=false;controls();}}
function showReceipt(){if(receipt)message('result',`Recibida por el servidor: versión ${receipt.version}, acuse ${receipt.receipt_id}, ${new Date(receipt.received_at).toLocaleString('es-MX',{timeZone:'America/Mexico_City'})} (America/Mexico_City). Publicación pendiente de confirmación.`);else message('result',`La versión ${record.version} todavía no tiene un envío confirmado.`);controls();}
try{const saved=JSON.parse(localStorage.getItem(storeKey)||'null');if(saved){record=content(validate(saved.record,false));receipt=saved.receipt||null;receivedRecord=receipt?(saved.receivedRecord||record):null;}}catch{message('draft-status','No se pudo recuperar el borrador guardado. Puedes abrir tu copia JSON.');}
showRecord();showReceipt();setView(location.hash==='#lecturas' && document.getElementById('readings-view')?'readings':'agenda');
$('save').onclick=()=>action(async()=>{await capture(false);if(persist())message('draft-status',`Versión ${record.version} guardada en este navegador.`);showReceipt();});
for(const type of ['json','markdown']) $(type).onclick=()=>action(async()=>{await capture();persist();download(type==='json'?JSON.stringify({record,receipt:receipt?.version===record.version?receipt:null},null,2):markdown(record),type==='json'?'application/json':'text/markdown',`semilla-${record.id}-v${record.version}.${type==='json'?'json':'md'}`);showReceipt();});
$('receipt-download').onclick=()=>download(JSON.stringify(receipt,null,2),'application/json',`acuse-${receipt.receipt_id}.json`);
$('new').onclick=()=>action(async()=>{if(!confirm('¿Crear otra semilla? Descarga o guarda primero la actual; el formulario se vaciará.'))return;record=newRecord();receipt=null;receivedRecord=null;showRecord();message('result','Nueva semilla. Todavía no hay un envío confirmado.');});
$('import').onchange=()=>action(async()=>{const f=$('import').files[0];if(!f)return;if(f.size>100000)throw Error('El JSON supera el tamaño permitido.');const data=JSON.parse(await f.text());const incoming=content(validate(data.record||data,false));if(!confirm('¿Abrir este registro y sustituir el formulario actual?'))return;record=incoming;receipt=null;receivedRecord=null;showRecord();message('result','Registro abierto. Consulta tus envíos para comprobar la versión recibida; un archivo importado no confirma recepción.');$('import').value='';});
$('login-form').onsubmit=e=>{e.preventDefault();action(async()=>{await api.otp($('email').value.trim());$('login-form').hidden=true;$('verify-form').hidden=false;message('auth-status','Si tu correo está registrado, recibirás un código. Revisa correo no deseado.');});};
$('change-email').onclick=()=>{$('login-form').hidden=false;$('verify-form').hidden=true;};
$('verify-form').onsubmit=e=>{e.preventDefault();action(async()=>{await api.verify($('email').value.trim(),$('otp').value.trim(),$('remember-device').checked);$('otp').value='';message('auth-status',`Sesión iniciada: ${api.session.user.email}.`);if($('remember-device').checked && !api.remembered)message('auth-status','Sesión iniciada. Este navegador no pudo guardar el acceso.');if(returnView){setView(returnView);returnView=null;}await readings.load();await loadMine();});};
$('device-logout').onclick=()=>$('logout').click();
$('logout').onclick=()=>action(async()=>{try{await api.logout();}finally{readings.clear();message('auth-status','Sesión cerrada.');$('submissions').replaceChildren();$('login-form').hidden=false;$('verify-form').hidden=true;}});
$('seed-form').onsubmit=e=>{e.preventDefault();if($('send').disabled || $('send').hidden)return;action(async()=>{await capture();if(receivedRecord && !changedSinceReceipt(record)){showReceipt();return;}persist();message('result','Enviando… espera el acuse antes de considerar recibida tu aportación.');receipt=await api.submit(record,$('attachment').files[0]);receivedRecord=record;persist();showReceipt();try{await loadMine();}catch{message('submissions','Tu envío fue recibido, pero no se pudo actualizar la lista. Conserva el acuse.');}});};
function node(tag,text){const n=document.createElement(tag);n.textContent=text;return n;}
async function loadMine(){
  const rows=await api.mine();$('submissions').replaceChildren();
  if(!rows.length)$('submissions').append(node('p','Todavía no hay envíos recibidos para esta cuenta.'));
  const latest=new Map();
  for(const row of rows)if(!latest.has(row.seed_id) || row.version>latest.get(row.seed_id))latest.set(row.seed_id,row.version);
  for(const row of rows){const el=node('div','');el.className='submission';el.append(node('strong',`${row.original.title} · v${row.version}`),node('p',`Acuse: ${row.receipt_id}`));const isLatest=row.version===latest.get(row.seed_id);const open=node('button',isLatest?'Editar · nueva versión':'Abrir esta versión anterior');open.className='secondary';open.onclick=()=>action(async()=>{if(!confirm('¿Sustituir el formulario por esta versión recibida?'))return;record=content(validate(row.original));receivedRecord=record;receipt={seed_id:row.seed_id,version:row.version,receipt_id:row.receipt_id,received_at:row.received_at};showRecord();showReceipt();persist();});if(isLatest)editShortcut(el,()=>open.click());el.append(open);$('submissions').append(el);}
}
$('refresh').onclick=()=>action(loadMine);
function agendaNotes(body){
  const {description,topics,activity}=splitAgenda(body);
  const notes=description?[node('p',description)]:[];
  for(const [label,value] of [['Temas a tratar',topics],['Dinámica o actividad prevista',activity]]){
    if(value)notes.push(node('strong',label),node('p',value));
  }
  return notes;
}
function renderEvent(row) {
  const card=node('article','');
  card.className='event';
  const dateOptions={timeZone:'America/Mexico_City',dateStyle:'full',timeStyle:'short'};
  const when=row.starts_at?new Date(row.starts_at).toLocaleString('es-MX',dateOptions):'Fecha por confirmar';
  card.append(node('p',when),node('h3',row.title),node('p',(row.kind==='session'?'Invitación al encuentro':'Tarea')+' · '+row.status));
  const details=node('details','');
  details.append(node('summary','Ver programa y materiales'),...agendaNotes(row.body));
  card.append(details);
  if(row.presentation){
    const link=node('a','Abrir presentación (PPTX)');
    link.href=row.presentation;
    details.append(link);
  }
  if(row.updated_at)card.append(node('small','Actualizado: '+new Date(row.updated_at).toLocaleString('es-MX',dateOptions)));
  if(row.starts_at && ['confirmada','reprogramada'].includes(row.status)){
    const link=node('a','Descargar este evento (.ics)');
    link.download='sesion-iie.ics';
    link.href='data:text/calendar;charset=utf-8,'+encodeURIComponent(calendarText([row]));
    card.append(link);
  }
  return card;
}

const feedField=$('feed-url');
feedField.value=new URL('agenda.ics',document.baseURI).href;
$('copy-feed').onclick=async()=>{
  try {
    await navigator.clipboard.writeText(feedField.value);
    message('copy-status','Enlace copiado');
  } catch {
    feedField.focus();
    feedField.select();
    message('copy-status','Copia la dirección seleccionada');
  }
};

async function agenda(){
  const [sessions,bulletins]=await Promise.allSettled([
    fetch('./encuentros.json',{cache:'no-store'}).then(response=>{
      if(!response.ok)throw Error('Agenda sin respuesta');
      return response.json();
    }).then(rows=>rows.map(sessionCard)),
    api?api.events():Promise.reject(Error('Servicio sin configurar'))
  ]);
  const rows=[...(sessions.value||[]),...(bulletins.value||[])];
  rows.sort((a,b)=>(Date.parse(a.starts_at)||Infinity)-(Date.parse(b.starts_at)||Infinity));
  $('events').replaceChildren(...rows.map(renderEvent));
  const notes=[];
  if(sessions.status==='rejected')notes.push('No se pudieron consultar las fichas de coordinación.');
  if(bulletins.status==='rejected')notes.push('Los avisos de Supabase no están disponibles.');
  if(!notes.length && !rows.length)notes.push('Todavía no hay encuentros ni tareas publicados.');
  message('agenda-status',notes.join(' '));
}
try{const response=await fetch('config.json',{cache:'no-store'});if(!response.ok)throw Error();const config=await response.json();if(config.supabaseUrl&&config.publishableKey){api=new Api(config);
    try {api.restore(window.localStorage);} catch {}
    api.onExpired=()=>{
      readings.clear();$('submissions').replaceChildren();$('auth-panel').hidden=false;
      $('login-form').hidden=false;$('verify-form').hidden=true;controls();
      message('auth-status','Tu sesión terminó. Solicita un nuevo código.');
    };
    window.addEventListener('storage',event=>{
      if(api.remembered && (event.key===api.storageKey || event.key===null)) {
        const saved=event.newValue && JSON.parse(event.newValue);
        if(!saved || saved.user.id!==api.session?.user.id) {
          api.remembered=false;api.session=null;api.onExpired();
        }
      }
    });
    emailReady=config.emailAccessReady===true;message('connection',emailReady?'Servicio conectado.':'Base conectada · acceso por correo en preparación.');if(!emailReady)message('auth-status','La coordinación está preparando el acceso por correo. Ya puedes guardar y descargar tu semilla.');}else message('connection','Modo local · prepara y descarga; envío central pendiente.');}catch{message('connection','Sin conexión al servicio · prepara y descarga tu semilla.');}
controls();
if(api?.session) {
  message('auth-status','Sesión de '+api.session.user.email);
  await readings.load();
  if(api.session) await loadMine().catch(()=>{});
}
await agenda();
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
window.addEventListener('online',agenda);
