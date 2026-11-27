import {ownEditor} from './editing.mjs';
import {setView} from './wizard.mjs';
import {filterReferences, readingProposal, loadReferences} from './reading-catalog.mjs';
const groupPath = '/groups/6712171';
const zoteroBase = 'https://www.zotero.org' + groupPath + '/seminario_iie-3t/items/';

export function zoteroItemKey(value) {
  if (!value.trim()) return null;
  const message = 'Pega el enlace a una referencia del grupo Seminario IIE-3T.';
  let url;
  try { url = new URL(value.trim()); } catch { throw Error(message); }
  const match = /^\/groups\/6712171\/(?:[\w%-]+\/)?(?:collections\/[A-Z0-9]{8}\/)?items?\/([A-Z0-9]{8})(?:\/library)?\/?$/i.exec(url.pathname);
  if (!['https://www.zotero.org','https://zotero.org'].includes(url.origin) ||
      url.username || url.password || !match) throw Error(message);
  return match[1].toUpperCase();
}
export function initReadings(getApi, login) {
  const element = (tag, text) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  };
  const button = text => Object.assign(element('button', text), {type:'button'});
  const tab = document.querySelector('[data-view=readings]');
  tab.dataset.view = 'readings';

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
  const access = button('Entrar con mi cuenta');
  access.onclick = login;
  const proposal = element('details');
  proposal.append(element('summary','Sugerir lectura'));
  view.append(element('h1','Lecturas'), element('p','Elige una referencia ya registrada en Zotero y propone el asunto y la dinámica para trabajarla con el grupo. Para corregir una aportación propia, pulsa Editar o haz doble clic sobre su texto.'), access, upcoming, proposal, refresh, status, cards);
  for (const part of [proposal, upcoming]) part.className = 'calendar-panel';
  tab.onclick = () => {setView('readings'); load();};
  refresh.onclick = async () => {
    const api = getApi();
    const session = api?.session;
    if (!session || refresh.disabled) return;

    refresh.disabled = true;
    status.textContent = 'Sincronizando catálogo con Zotero…';
    let message = 'Catálogo de Zotero actualizado.';
    try {
      await api.request('/functions/v1/sync-reading-catalog', {method:'POST', body:{}});
    } catch {
      message = 'No se pudo sincronizar con Zotero. Se muestra el último catálogo disponible.';
    } finally {
      try {
        if (getApi()?.session === session) await load(message);
      } finally {
        refresh.disabled = false;
      }
    }
  };
  document.querySelector('[data-view="agenda"]').addEventListener('click', () => load());

  function form(path, caption, fields, id) {
    const node = element('form');
    let submissionId = crypto.randomUUID();
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
      if (path === 'readings') {
        try { Object.assign(data, readingProposal(data, references)); }
        catch (error) {
          const input = node.elements.zotero_key;
          input.setCustomValidity(error.message);
          input.reportValidity();
          return;
        }
      }
      if (id) data.reading_id = id;
      if (path !== 'agreements') data.id = submissionId;
      if (path === 'agreements') {data.day ||= null; data.facilitator ||= '';}
      submit.disabled = true;
      try {
        await getApi().request('/rest/v1/'+tables[path]+'?select=*',{method:'POST',body:data,returnRows:true});
        submissionId = crypto.randomUUID();
        node.reset();
        if (node.parentElement === proposal) proposal.open = false;
        await load('Guardado en el seminario.');
      } catch (error) {status.textContent = error.message;}
      finally {submit.disabled = false;}
    };
    return node;
  }
  const suggestion = form('readings','Guardar propuesta',[
    ['zotero_key','Referencia de Zotero','select'],
    ['question','Asunto o pregunta propuestos','textarea'],
    ['processing','Dinámica de procesamiento propuesta','textarea']
  ]);
  suggestion.className = 'reading-proposal';
  suggestion.elements.zotero_key.setAttribute('aria-label','Referencia de Zotero');
  const findLabel = element('label','Buscar por título');
  const search = element('input');
  search.type = 'search'; search.placeholder = 'Escribe palabras del título';
  findLabel.append(search);
  const catalogStatus = element('p'); catalogStatus.className = 'hint'; catalogStatus.setAttribute('role','status');
  const preview = element('div'); preview.className = 'reading-reference-preview';
  const source = element('p','Primero incorpora la referencia a la ');
  const library = element('a','biblioteca del grupo en Zotero');
  library.href = 'https://www.zotero.org/groups/6712171/seminario_iie-t/library';
  library.target = '_blank'; library.rel = 'noopener';
  source.append(library,document.createTextNode('. Si no aparece, pulsa Actualizar lecturas para sincronizar el catálogo con Zotero.'));
  source.className = 'hint';
  suggestion.prepend(findLabel);
  suggestion.elements.zotero_key.closest('label').after(catalogStatus,preview,source);
  suggestion.elements.question.placeholder = '¿Qué asunto o pregunta del seminario ayudaría a trabajar?';
  suggestion.elements.processing.placeholder = 'Por ejemplo: discusión guiada, preguntas previas o una actividad de contraste.';
  suggestion.addEventListener('reset',()=>{search.value='';queueMicrotask(renderCatalog);});
  search.oninput = () => renderCatalog();
  suggestion.elements.zotero_key.onchange = () => {
    suggestion.elements.zotero_key.setCustomValidity('');
    renderReference();
  };
  proposal.append(suggestion);
  let references = [];
  function renderReference() {
    preview.replaceChildren();
    const row=references.find(row=>row.zotero_key===suggestion.elements.zotero_key.value);
    if(!row)return;
    const link=element('a','Abrir esta referencia en Zotero');
    link.href=zoteroBase+row.zotero_key;link.target='_blank';link.rel='noopener';
    preview.append(element('p',row.citation),link);
  }
  function renderCatalog() {
    const select=suggestion.elements.zotero_key;
    const selected=select.value;
    const matches=filterReferences(references,search.value);
    const empty=element('option',references.length?'Selecciona una referencia':'Catálogo sin referencias');empty.value='';
    select.replaceChildren(empty,...matches.map(row=>{
      const duplicate=references.some(other=>other.zotero_key!==row.zotero_key&&other.title===row.title);
      const label=row.title+(duplicate?' — '+row.citation.slice(0,90)+(row.citation.length>90?'…':''):'');
      const option=element('option',label);option.value=row.zotero_key;return option;
    }));
    select.value=matches.some(row=>row.zotero_key===selected)?selected:'';
    select.disabled=!matches.length;
    suggestion.querySelector('button[type=submit],button:not([type])').disabled=!matches.length;
    const synced=references[0]?.synced_at;
    catalogStatus.textContent=references.length ? `${matches.length} de ${references.length} referencias.${synced?' Catálogo sincronizado: '+new Date(synced).toLocaleString('es-MX',{timeZone:'America/Mexico_City'})+' (America/Mexico_City).':''}` : 'Todavía no hay referencias sincronizadas. La propuesta requiere un registro existente de Zotero.';
    renderReference();
  }
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
    if (row.zotero_key) {
      const link = element('a','Abrir en Zotero');
      link.href = zoteroBase + row.zotero_key;
      link.target = '_blank';
      link.rel = 'noopener';
      const line = element('p');
      line.append(link);
      node.append(line);
    }
    const editArea = element('section');
    node.append(editArea);
    editArea.append(element('p','Propuesta · '+row.author),element('h3','Asunto o pregunta propuestos'),element('p',row.question));
    if(row.processing)editArea.append(element('h3','Dinámica de procesamiento propuesta'),element('p',row.processing));
    if(row.excerpt)editArea.append(element('h3','Fragmento sugerido'),element('p',row.excerpt));
    if(row.edited_at) editArea.append(element('small','Editada · '+new Date(row.edited_at).toLocaleString('es-MX')));
    ownEditor(editArea,{row,table:'readings',getApi,onSaved:()=>load('Cambios guardados.'),
      fields:[['question','Asunto o pregunta propuestos',true],['processing','Dinámica de procesamiento propuesta',!!row.processing],['excerpt','Fragmento sugerido (opcional)',false]]});
    node.append(element('h3','Debate sobre su interés'));
    for (const comment of row.comments) {
      const entry=element('section');
      entry.append(element('p',comment.author+' · '+comment.body));
      if(comment.edited_at)entry.append(element('small','Editado · '+new Date(comment.edited_at).toLocaleString('es-MX')));
      ownEditor(entry,{row:comment,table:'reading_comments',getApi,onSaved:()=>load('Comentario actualizado.'),fields:[['body','Comentario',true]]});
      node.append(entry);
    }
    if (!row.comments.length) node.append(element('p','Aún no hay aportaciones.'));
    node.append(form('comments','Añadir comentario',[['body','¿Para qué nos serviría leerla juntos?','textarea']], row.id));
    if (row.agreement) node.append(element('h3','Acuerdo del grupo'),element('p',summary(row)));
    else if (coordinator) {
      const decision = element('details');
      decision.append(element('summary','Registrar acuerdo del grupo'),form('agreements','Guardar acuerdo',[
        ['kind','Uso acordado','select',['Discutir en sesión','Integrar en una actividad','Retomar después']],
        ['plan','Objetivo y pregunta, tarea o motivo para posponer','textarea'],['facilitator','Quién facilita o da seguimiento'],['day','Fecha acordada','date']
      ],row.id));
      node.append(decision);
    }
    return node;
  }
  const tables = {readings:'readings', comments:'reading_comments', agreements:'reading_agreements'};
  let sequence = 0;
  let coordinator = false;
  function clear() {
    ++sequence;
    coordinator = false;
    references = [];
    cards.replaceChildren(); agenda.replaceChildren(); upcoming.replaceChildren();
    proposal.open = false;
    proposal.querySelector('form').reset();
    renderCatalog();
    proposal.hidden = refresh.hidden = upcoming.hidden = true;
    access.hidden = false;
    status.textContent = 'Entra con tu correo registrado para consultar las lecturas.';
  }
  async function load(message = '') {
    const token = ++sequence;
    try {
      const api = getApi();
      if (!api?.session) {clear(); return;}
      access.hidden = true;
      const session = api.session;
      const [members, readings, catalog] = await Promise.all([
        api.request('/rest/v1/reading_members?select=user_id,display_name,coordinator'),
        api.request('/rest/v1/readings?select=*,comments:reading_comments(*),agreement:reading_agreements(*)&order=created_at.desc&comments.order=created_at.asc'),
        loadReferences(api)
      ]);
      if (token !== sequence || session !== api.session) return;
      const me = members.find(member => member.user_id === session.user.id);
      if (!me) {clear(); access.hidden = true; status.textContent = 'Tu cuenta aún no está habilitada para Lecturas.'; return;}
      coordinator = me.coordinator;
      references = catalog;
      renderCatalog();
      proposal.hidden = refresh.hidden = upcoming.hidden = false;
      const names = new Map(members.map(member => [member.user_id,member.display_name]));
      const rows = readings.map(row => ({...row,author:names.get(row.owner_id) || 'Ficha inicial del seminario',
        comments:row.comments.map(comment => ({...comment,author:names.get(comment.owner_id)})),
        agreement:Array.isArray(row.agreement) ? row.agreement[0] : row.agreement}));
      cards.replaceChildren(...rows.map(card));
      const scheduled = rows.filter(row=>row.agreement?.day).sort((a,b)=>a.agreement.day.localeCompare(b.agreement.day));
      const today = new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Mexico_City'}).format(new Date());
      const next = scheduled.find(row=>row.agreement.day >= today);
      upcoming.replaceChildren(element('h2','Próxima lectura acordada'),element('p',next ? next.title+' · '+summary(next) : 'Aún no hay una próxima lectura con fecha.'));
      agenda.replaceChildren();
      if (scheduled.length) agenda.append(element('h2','Lecturas acordadas'));
      for (const row of scheduled) {
        const open = button(row.title+' · '+summary(row));
        open.onclick = () => {setView('readings');document.getElementById('lectura-'+row.id).focus();};
        agenda.append(open);
      }
      status.textContent = message;
    } catch (error) {if (token === sequence) {clear(); refresh.hidden = false; status.textContent = error.message;}}
  }
  clear();
  return {load,clear};
}
