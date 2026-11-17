import {readFile} from 'node:fs/promises';
import {verifyRestore} from './restore.mjs';
try {
  const backup = JSON.parse(await readFile(process.argv[2], 'utf8'));
  await verifyRestore(backup);
  console.log('Restauración aislada verificada.', Object.fromEntries(
    Object.entries(backup.data).map(([table, rows]) => [table, rows.length])
  ));
} catch (error) {
  console.error('Restauración incompleta.', error.code || error.name);
  process.exitCode = 1;
}
