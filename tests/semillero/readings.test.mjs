import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {createSchema} from './schema.mjs';
test('Lecturas comparte el debate entre miembros y reserva el acuerdo a coordinación',async()=>{
 const db=new PGlite();
 try{
  await createSchema(db);
  await db.exec(await readFile(new URL('../../supabase/migrations/202611130001_lecturas.sql',import.meta.url),'utf8'));
  const [a,b,c]=Array.from({length:3},()=>crypto.randomUUID());
  for(const id of [a,b,c])await db.query('insert into auth.users(id) values($1)',[id]);
  await db.query("insert into reading_members values($1,'A',false),($2,'B',true)",[a,b]);
  const login=async id=>{await db.exec('reset role;set role authenticated');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);};
  await login(a);
  const {id}= (await db.query('select id from readings')).rows[0];
  await db.query("insert into reading_comments(id,reading_id,body) values(gen_random_uuid(),$1,'Prueba')",[id]);
  const agreement=()=>db.query("insert into reading_agreements(reading_id,kind,plan) values($1,'Retomar después','Motivo')",[id]);
  await assert.rejects(agreement(),{code:'42501'});
  await login(b);
  assert.equal((await db.query('select owner_id from reading_comments')).rows[0].owner_id,a);
  await agreement(); await assert.rejects(agreement(),{code:'23505'});
  await login(c);
  assert.equal((await db.query('select * from readings')).rows.length,0);
  await assert.rejects(db.query("insert into reading_comments(id,reading_id,body) values(gen_random_uuid(),$1,'Prueba')",[id]),{code:'42501'});
  await db.exec('reset role;set role anon');
  await assert.rejects(db.query('select * from readings'),{code:'42501'});
 }finally{await db.close();}
});
