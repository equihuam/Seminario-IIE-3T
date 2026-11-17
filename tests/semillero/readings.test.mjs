import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {createSchema} from './schema.mjs';
import {filterReferences,readingProposal,loadReferences} from '../../blog/app/reading-catalog.mjs';

test('El selector busca títulos sin distinguir acentos y conserva identidades duplicadas',async()=>{
 const catalog=[{zotero_key:'AAAAAAAA',title:'Condición ecológica'},{zotero_key:'BBBBBBBB',title:'Condición ecológica'},{zotero_key:'CCCCCCCC',title:'Detección imperfecta',active:false}];
 assert.equal(filterReferences(catalog,'ECOLOGICA condicion').length,2);
 assert.deepEqual(filterReferences(catalog,'inexistente'),[]);
 const values={zotero_key:'BBBBBBBB',question:'Asunto original',processing:'Debate en parejas',title:'No usar título manual'};
 assert.deepEqual(readingProposal(values,catalog),{zotero_key:'BBBBBBBB',question:values.question,processing:values.processing});
 assert.throws(()=>readingProposal({...values,zotero_key:'libre'},catalog),/Selecciona/);
 assert.throws(()=>readingProposal({...values,zotero_key:'CCCCCCCC'},catalog),/Selecciona/);
 assert.throws(()=>readingProposal({...values,processing:' '},catalog),/dinámica/);
 let calls=0;
 const rows=await loadReferences({request:async path=>{calls++;assert.match(path,/active=eq.true/);return calls===1?Array.from({length:200},(_,i)=>({title:String(i)})):[{title:'Última'}];}});
 assert.equal(rows.length,201);assert.equal(calls,2);
});

test('Las nuevas propuestas exigen Zotero y dinámica; metadatos e histórico quedan protegidos',async()=>{
 const db=new PGlite();
 try{
  await createSchema(db);
  for(const file of ['202611130001_lecturas.sql','202611130002_lecturas_zotero.sql','202611170001_lecturas_catalogo.sql'])
    await db.exec(await readFile(new URL('../../supabase/migrations/'+file,import.meta.url),'utf8'));
  const [member,outsider]=[crypto.randomUUID(),crypto.randomUUID()];
  for(const id of [member,outsider])await db.query('insert into auth.users(id) values($1)',[id]);
  await db.query("insert into reading_members values($1,'Miembro',false)",[member]);
  await db.exec("insert into reading_references(zotero_key,title,citation,url,source_version) values('AAAAAAAA','Título Zotero','Cita Zotero','https://example.org/reference',4),('BBBBBBBB','Retirada','Cita','',1)");
  await db.exec("update reading_references set active=false where zotero_key='BBBBBBBB'");
  const historical=(await db.query('select * from readings')).rows[0];
  assert.equal(historical.zotero_key,'UCRDH3KH');assert.equal(historical.processing,'');assert.ok(historical.excerpt);
  const login=async id=>{await db.exec('reset role;set role authenticated');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);};
  await login(member);
  assert.equal((await db.query('select * from reading_references')).rows.length,2);
  const insert=(key,processing='Discusión guiada')=>db.query('insert into readings(id,zotero_key,question,processing) values($1,$2,$3,$4) returning *',[crypto.randomUUID(),key,'Asunto del proponente',processing]);
  const row=(await insert('AAAAAAAA')).rows[0];
  assert.equal(row.title,'Título Zotero');assert.equal(row.citation,'Cita Zotero');assert.equal(row.question,'Asunto del proponente');assert.equal(row.processing,'Discusión guiada');
  assert.equal(row.zotero_version,4);
  const forged=(await db.query("insert into readings(id,zotero_key,title,citation,url,question,processing) values($1,'AAAAAAAA','Inventado','Inventada','https://example.org/fake','Asunto','Taller') returning *",[crypto.randomUUID()])).rows[0];
  assert.equal(forged.title,'Título Zotero');assert.equal(forged.url,'https://example.org/reference');
  for(const key of [null,'ZZZZZZZZ','BBBBBBBB'])await assert.rejects(insert(key),{code:'23503'});
  await assert.rejects(insert('AAAAAAAA',' '),{code:'23514'});
  await assert.rejects(db.exec("insert into reading_references(zotero_key,title,citation,source_version) values('CCCCCCCC','Manual','Manual',1)"),{code:'42501'});
  await login(outsider);
  assert.equal((await db.query('select * from reading_references')).rows.length,0);
  await assert.rejects(insert('AAAAAAAA'),{code:'42501'});
  await db.exec('reset role;set role anon');
  await assert.rejects(db.exec('select * from reading_references'),{code:'42501'});
 }finally{await db.close();}
});
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
