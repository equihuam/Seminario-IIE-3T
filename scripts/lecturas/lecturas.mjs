import './app.mjs';
import {setView} from './wizard.mjs';

const element = (tag, text) => {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  return node;
};
const button = text => Object.assign(element('button', text), {type:'button'});
const tab = button('Lecturas');
tab.dataset.view = 'readings';
document.querySelector('[data-view="agenda"]').after(tab);
const view = element('section');
view.id = 'readings-view';
view.className = 'view board';
view.hidden = true;
document.querySelector('#agenda-view').after(view);
const agenda = element('section');
document.querySelector('#agenda-status').before(agenda);
const status = element('p');
status.setAttribute('role','status');
const cards = element('div');
const upcoming = element('div');
const refresh = button('Actualizar lecturas');
const proposal = element('details');
proposal.append(element('summary','Sugerir lectura'));
view.append(element('h1','Lecturas'), element('p','Piloto local · las ventanas de este tablero comparten los cambios. Usa nombres de prueba para ensayar alumnos, tutores y coordinación.'), upcoming, proposal, refresh, status, cards);
for (const part of [proposal, upcoming]) part.className = 'calendar-panel';
tab.onclick = () => {setView('readings'); load();};
refresh.onclick = () => load();
document.querySelector('[data-view="agenda"]').addEventListener('click', () => load());

function form(path, caption, fields, id) {
  const node = element('form');
  for (const [key, label, type, options] of fields) {
    const wrapper = element('label', label);
    const input = element(type === 'textarea' || type === 'select' ? type : 'input');
    input.name = key;
    if (input.tagName === 'INPUT') input.type = type || 'text';
    input.required = !label.includes('opcional');
    if ('maxLength' in input) input.maxLength = 2000;
    for (const option of options || []) input.append(element('option',option));
    wrapper.append(input);
    node.append(wrapper);
  }
  if (path === 'agreements') {
    const {kind, day, facilitator} = node.elements;
    kind.onchange = () => {
      for (const input of [day, facilitator]) {
        input.required = kind.value !== 'Retomar después';
        input.disabled = !input.required;
        input.closest('label').hidden = input.disabled;
      }
    };
  }
  const submit = element('button',caption);
  node.append(submit);
  node.onsubmit = async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(node));
    if (id) data.id = String(id);
    submit.disabled = true;
    try {
      const response = await fetch('/'+path, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      if (!response.ok) throw Error(await response.json());
      node.reset();
      if (node.parentElement === proposal) proposal.open = false;
      await load('Guardado en el piloto.');
    } catch (error) {status.textContent = error.message;}
    finally {submit.disabled = false;}
  };
  return node;
}
proposal.append(form('readings','Guardar propuesta',[
  ['author','Quién propone'],['title','Título'],['citation','Referencia bibliográfica'],
  ['url','Enlace (opcional)','url'],['question','¿Qué pregunta del seminario ayudaría a trabajar?','textarea'],
  ['excerpt','Fragmento sugerido (opcional)']
]));
function summary(row) {
  const a = row.agreement;
  return [a.kind, a.day, a.facilitator, a.plan].filter(Boolean).join(' · ');
}
function card(row) {
  const node = element('article');
  node.className = 'calendar-panel';
  node.id = 'lectura-'+row.id;
  node.tabIndex = -1;
  node.append(element('h2',row.title),element('p',row.citation));
  if (row.url) {
    const link = element('a','Abrir la fuente');
    link.href = row.url;
    node.append(link);
  }
  node.append(element('p','Propuesta · '+row.author),element('h3',row.question),element('p',row.excerpt),
              element('h3','Debate sobre su interés'));
  for (const comment of row.comments) node.append(element('p',comment.author+' · '+comment.body));
  if (!row.comments.length) node.append(element('p','Aún no hay aportaciones.'));
  node.append(form('comments','Añadir comentario',[['author','Tu nombre de prueba'],['body','¿Para qué nos serviría leerla juntos?','textarea']], row.id));
  if (row.agreement) node.append(element('h3','Acuerdo del grupo'),element('p',summary(row)));
  else {
    const decision = element('details');
    decision.append(element('summary','Registrar acuerdo como coordinación (simulación)'),form('agreements','Guardar acuerdo',[
      ['kind','Uso acordado','select',['Discutir en sesión','Integrar en una actividad','Retomar después']],
      ['plan','Objetivo y pregunta, tarea o motivo para posponer','textarea'],['facilitator','Quién facilita o da seguimiento'],['day','Fecha acordada','date']
    ],row.id));
    node.append(decision);
  }
  return node;
}
let sequence = 0;
async function load(message = '') {
  const token = ++sequence;
  try {
    const response = await fetch('/readings',{cache:'no-store'});
    if (!response.ok) throw Error('No se pudo consultar el piloto.');
    const rows = await response.json();
    if (token !== sequence) return;
    cards.replaceChildren(...rows.map(card));
    const scheduled = rows.filter(row=>row.agreement?.day).sort((a,b)=>a.agreement.day.localeCompare(b.agreement.day));
    const today = new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Mexico_City'}).format(new Date());
    const next = scheduled.find(row=>row.agreement.day >= today);
    upcoming.replaceChildren(element('h2','Próxima lectura acordada'),element('p',next ? next.title+' · '+summary(next) : 'Aún no hay una próxima lectura con fecha.'));
    agenda.replaceChildren();
    if (scheduled.length) agenda.append(element('h2','Lecturas acordadas · piloto'));
    for (const row of scheduled) {
      const open = button(row.title+' · '+summary(row));
      open.onclick = () => {setView('readings');document.getElementById('lectura-'+row.id).focus();};
      agenda.append(open);
    }
    status.textContent = message;
  } catch (error) {if (token === sequence) status.textContent = error.message;}
}
await load();
if (location.hash === '#lecturas') setView('readings');
