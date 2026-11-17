import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {createInterface} from 'node:readline/promises';
import {stdin, stdout} from 'node:process';
import assert from 'node:assert/strict';
import {Api} from '../blog/app/api.mjs';
import {newRecord, sha256} from '../blog/app/model.mjs';

const [mode, email, target] = process.argv.slice(2);
const uuid = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
const pathPattern = new RegExp(`^${uuid}/${uuid}/1/[0-9a-f]{64}$`);
if (!email || !['enviar','contrastar'].includes(mode) ||
    (mode === 'contrastar' && !pathPattern.test(target || ''))) {
  throw Error('Uso: node supabase/t009.mjs enviar CORREO | contrastar CORREO RUTA');
}
if (!stdin.isTTY) throw Error('Abre una terminal interactiva para introducir el código.');
const config = JSON.parse(await readFile(new URL('../blog/app/config.json', import.meta.url), 'utf8'));
const api = new Api(config);
const terminal = createInterface({input:stdin, output:stdout});
const endpoint = path => '/storage/v1/object/authenticated/originales/' + path;
try {
  if (!process.argv.includes('--codigo-enviado')) await api.otp(email);
  const code = await terminal.question('Código de tu correo (introdúcelo aquí en privado): ');
  await api.verify(email, code.trim());
  assert.equal(api.session.user.email.toLowerCase(), email.toLowerCase());
  if (mode === 'enviar') {
    const record = newRecord();
    const file = new File(['Prueba sintética T009 ' + record.id], 't009.txt');
    const digest = await sha256(await file.arrayBuffer());
    Object.assign(record, {author:'T009',title:'Prueba técnica T009',question:'¿Se recupera el adjunto?',
      motivation:'Verificar acceso con dos participantes.',attachment:{name:file.name,size:file.size,sha256:digest}});
    const receipt = await api.submit(record, file);
    assert.equal(receipt.seed_id, record.id);
    const path = [api.session.user.id,record.id,record.version,digest].join('/');
    const bytes = await api.request(endpoint(path), {raw:true});
    assert.equal(await sha256(bytes), digest);
    const directory = new URL('../private/t009/', import.meta.url);
    await mkdir(directory, {recursive:true});
    await writeFile(new URL(record.id + '.json', directory), JSON.stringify({receipt,path,sha256_verified:true}), {flag:'wx'});
    console.log('Original recuperado y SHA-256 verificado. Acuse:', receipt.receipt_id);
    console.log('Ruta de prueba para la segunda cuenta:', path);
  } else {
    assert.notEqual(api.session.user.id, target.split('/')[0]);
    // Comprueba la identidad en el servidor inmediatamente antes de la lectura.
    const identity = await api.request('/auth/v1/user');
    assert.equal(identity.id, api.session.user.id);
    try {
      await api.request(endpoint(target), {raw:true});
      throw Error('La segunda cuenta pudo descargar el objeto.');
    } catch (error) {
      const hidden = [400,404].includes(error.status) && /object not found|resource was not found/i.test(error.message);
      if (error.status !== 403 && !hidden) throw error;
      console.log('Sesión verificada. Descarga ajena denegada. HTTP', error.status, error.message);
    }
  }
} finally {
  terminal.close();
  if (api.session) await api.logout();
}
