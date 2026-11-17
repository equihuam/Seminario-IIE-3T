// Zotero metadata is supplied by the member-only catalog, never by a browser key.
export const zoteroReadingBase = 'https://www.zotero.org/groups/6712171/seminario_iie-3t/items/';
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');

export function filterReferences(references, query) {
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  return references.filter(row => words.every(word => normalize(row.title).includes(word)));
}

export function readingProposal(values, references) {
  const reference = references.find(row => row.zotero_key === values.zotero_key && row.active !== false);
  if (!reference) throw Error('Selecciona una referencia existente del catálogo de Zotero.');
  for (const key of ['question', 'processing']) {
    if (typeof values[key] !== 'string' || !values[key].trim() || values[key].length > 2000)
      throw Error('Completa el asunto y la dinámica de procesamiento (máximo 2000 caracteres cada uno).');
  }
  return {zotero_key: reference.zotero_key, question: values.question, processing: values.processing};
}

export async function loadReferences(api) {
  const rows = [];
  const size = 200;
  for (let offset = 0; ; offset += size) {
    const page = await api.request('/rest/v1/reading_references?select=zotero_key,title,citation,url,active,synced_at&active=eq.true&order=title.asc,zotero_key.asc&limit='+size+'&offset='+offset);
    rows.push(...page);
    if (page.length < size) return rows;
  }
}
