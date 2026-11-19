// A visible button remains the primary control on touch devices and keyboards.
export function editShortcut(container, open) {
  container.addEventListener('dblclick', event => {
    if (event.target.closest('button,a,input,textarea,select,label,form,summary')) return;
    event.stopPropagation();
    open();
  });
}

export async function saveOwnEdit(api, table, row, values) {
  const allowed = {readings:['question','processing','excerpt'],reading_comments:['body']}[table];
  if (!allowed || !api?.session?.user?.id || api.session.user.id !== row.owner_id)
    throw Error('Solo puedes editar tus propias aportaciones.');
  const body = Object.fromEntries(allowed.filter(key=>key in values).map(key=>[key,values[key]]));
  const query = new URLSearchParams({id:'eq.'+row.id,owner_id:'eq.'+row.owner_id,revision:'eq.'+row.revision,select:'*'});
  const saved = await api.request('/rest/v1/'+table+'?'+query,{method:'PATCH',body,returnRows:true});
  if (saved?.length !== 1) throw Error('No se guardó: la entrada cambió o ya no tienes permiso. Conserva tu texto y actualiza la lista antes de volver a editar.');
  return saved[0];
}

export function ownEditor(container, {row, table, fields, getApi, onSaved}) {
  if (!row.owner_id || row.owner_id !== getApi()?.session?.user?.id) return;
  const owner = row.owner_id;
  const edit = document.createElement('button');
  edit.type = 'button'; edit.textContent = 'Editar'; edit.className = 'secondary';
  edit.id = 'edit-'+table+'-'+row.id;
  const editor = document.createElement('form'); editor.hidden = true;
  editor.className = 'entry-editor';
  for (const [key, caption, required] of fields) {
    const label = document.createElement('label'); label.textContent = caption;
    const input = document.createElement('textarea');
    input.name = key; input.maxLength = 2000; input.required = !!required;
    label.append(input); editor.append(label);
  }
  const save = document.createElement('button'); save.textContent = 'Guardar cambios'; save.type = 'submit';
  const cancel = document.createElement('button'); cancel.textContent = 'Cancelar'; cancel.type = 'button';
  const status = document.createElement('p'); status.setAttribute('role','status');
  editor.append(save,cancel,status); container.append(edit,editor);
  function open() {
    if (owner !== getApi()?.session?.user?.id || !editor.hidden) return;
    for (const [key] of fields) editor.elements[key].value = row[key] || '';
    status.textContent = ''; editor.hidden = false; edit.hidden = true;
    editor.querySelector('textarea').focus();
  }
  edit.onclick = open; editShortcut(container,open);
  cancel.onclick = () => {editor.hidden = true; edit.hidden = false; edit.focus();};
  editor.onsubmit = async event => {
    event.preventDefault(); if (save.disabled) return;
    save.disabled = cancel.disabled = true;
    try {
      const saved = await saveOwnEdit(getApi(),table,row,Object.fromEntries(new FormData(editor)));
      Object.assign(row,saved);
      status.textContent = 'Cambios guardados.';
      await onSaved();
      document.getElementById(edit.id)?.focus();
    } catch (error) {status.textContent = error.message;}
    finally {save.disabled = cancel.disabled = false;}
  };
}
