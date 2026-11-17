// Las filas se conservan como texto JSON de PostgreSQL para mantener la precisión.
export const tables = [
  ['seeds', 'id'],
  ['seed_versions', 'seed_id, version'],
  ['seed_reviews', 'id'],
  ['bulletins', 'id'],
  ['bulletin_history', 'id'],
];

export async function snapshot(db) {
  const data = {};
  await db.query('begin isolation level repeatable read read only');
  try {
    await db.query("set local time zone 'UTC'");
    for (const [table, order] of tables) {
      const result = await db.query(
        `select to_jsonb(t)::text as row from public.${table} t order by ${order}`
      );
      data[table] = result.rows.map(record => record.row);
    }
    await db.query('commit');
    return data;
  } catch (error) {
    await db.query('rollback');
    throw error;
  }
}
