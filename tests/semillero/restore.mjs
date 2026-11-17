import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {snapshot, tables} from '../../supabase/snapshot.mjs';
import {createSchema} from './schema.mjs';

export async function verifyRestore(backup) {
  assert.equal(backup.format, 'semillero-sql/1');
  assert.deepEqual(Object.keys(backup.data).sort(), tables.map(([name]) => name).sort());
  const db = new PGlite();
  try {
    await createSchema(db);
    // Los UUID permiten verificar claves foráneas sin copiar identidades de Auth.
    const owners = new Set([...backup.data.seeds, ...backup.data.seed_versions]
      .map(row => JSON.parse(row).owner_id));
    for (const id of owners) await db.query('insert into auth.users values ($1)', [id]);
    // El respaldo contiene las marcas de tiempo e historial originales.
    await db.exec('alter table public.bulletins disable trigger bulletin_history');
    for (const [table] of tables) {
      for (const row of backup.data[table]) {
        await db.query(`insert into public.${table} overriding system value
          select * from jsonb_populate_record(null::public.${table}, $1::jsonb)`, [row]);
      }
    }
    await db.exec('alter table public.bulletins enable trigger bulletin_history');
    const restored = await snapshot(db);
    // Comparar en privado, sin que un error de aserción imprima contenido.
    for (const [name] of tables) {
      assert.ok(JSON.stringify(restored[name]) === JSON.stringify(backup.data[name]), name);
    }
  } finally {
    await db.close();
  }
}
