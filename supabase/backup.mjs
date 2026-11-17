import {parseArgs} from 'node:util';
import {mkdir, mkdtemp, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {connection} from './connection.mjs';
import {snapshot} from './snapshot.mjs';

const {values} = parseArgs({options: Object.fromEntries(
  ['config','host','user','ca'].map(name => [name, {type:'string'}])
)});
let client;
try {
  const connected = await connection(values);
  client = connected.client;
  if (connected.ref !== 'owqoinfndqzqwiiiexks') throw Error('Proyecto inesperado');
  const data = await snapshot(client);
  const root = fileURLToPath(new URL('../private/respaldos/', import.meta.url));
  await mkdir(root, {recursive:true, mode:0o700});
  const directory = await mkdtemp(join(root, new Date().toISOString().replace(/:/g,'-') + '-'));
  const path = join(directory, 'semillero.json');
  await writeFile(path, JSON.stringify({format:'semillero-sql/1', project:connected.ref, data}), {flag:'wx', mode:0o600});
  console.log(path);
} catch (error) {
  console.error('Respaldo incompleto.', error.code || error.name);
  process.exitCode = 1;
} finally {
  if (client) await client.end();
}
