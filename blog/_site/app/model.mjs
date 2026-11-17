export const SCHEMA = 'iie-semilla/0';
const limits = { author:160, title:180, question:8000, motivation:4000, example:4000 };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function newRecord() {
  return {schema:SCHEMA, id:crypto.randomUUID(), version:1, created_at:new Date().toISOString(),
    author:'', title:'', question:'', motivation:'', example:'', sharing:'coordination', attachment:null};
}
export function validate(record, complete = true) {
  if (!record || record.schema !== SCHEMA || !uuid.test(record.id) || !Number.isInteger(record.version) || record.version < 1 || record.version > 100000 || !Number.isFinite(Date.parse(record.created_at))) throw Error('El archivo no es un registro de semilla versión 0 válido.');
  for (const [key, max] of Object.entries(limits)) {
    if (typeof record[key] !== 'string' || record[key].length > max || (complete && key !== 'example' && !record[key].trim())) throw Error(`Revisa el campo ${key}: es obligatorio y admite hasta ${max} caracteres.`);
  }
  if (!['coordination','review_publication'].includes(record.sharing)) throw Error('Condiciones para compartir no válidas.');
  if (record.attachment !== null && (!record.attachment || !/^[a-f0-9]{64}$/.test(record.attachment.sha256) || !Number.isInteger(record.attachment.size) || record.attachment.size < 1 || record.attachment.size > 5242880 || typeof record.attachment.name !== 'string' || record.attachment.name.length > 240 || !/\.(pdf|docx|txt|md)$/i.test(record.attachment.name))) throw Error('Documento original no válido.');
  return record;
}
export function content(record) {
  return Object.fromEntries(['schema','id','version','created_at','author','title','question','motivation','example','sharing','attachment'].map(key=>[key,record[key]]));
}
export function sameContent(a,b) { return JSON.stringify(content(a)) === JSON.stringify(content(b)); }
export function markdown(r) {
  validate(r);
  return `# ${r.title}\n\nAutoría: ${r.author}\n\nID local: ${r.id} · Versión: ${r.version}\n\nFecha de creación: ${r.created_at}\n\n## Idea o pregunta original\n\n${r.question}\n\n## Por qué importa\n\n${r.motivation}\n\n## Ejemplo o contexto\n\n${r.example || 'Sin añadir.'}\n\n## Condiciones para compartir\n\n${r.sharing === 'coordination' ? 'Solo coordinación por ahora.' : 'Preparar versión pública; confirmar antes de publicar.'}\n\n## Documento original\n\n${r.attachment ? `${r.attachment.name}\n\nSHA256: ${r.attachment.sha256}` : 'Sin documento adjunto.'}\n\n## Valoraciones y siguiente paso\n\nPendientes de revisión y acuerdo; no forman parte de la aportación original.\n`;
}
export async function sha256(bytes) { return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join(''); }
