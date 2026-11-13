// Live SQL acceptance test. All synthetic users and records are rolled back.
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {parseArgs} from 'node:util';
import {connection} from './connection.mjs';
const {values}=parseArgs({options:{config:{type:'string'},host:{type:'string'},user:{type:'string'},ca:{type:'string'}}});
let db;
try{
  const connected=await connection(values);db=connected.client;
  const a=randomUUID(),b=randomUUID(),id=randomUUID();
  const record={schema:'iie-semilla/0',id,version:1,created_at:new Date().toISOString(),author:'Prueba técnica sintética',title:'Prueba transaccional',question:'¿Se conserva el original?',motivation:'Verificar software; no es una aportación del seminario.',example:'',sharing:'coordination',attachment:null};
  await db.query('begin');
  await db.query("insert into auth.users(id,email,aud,role) values($1,$2,'authenticated','authenticated'),($3,$4,'authenticated','authenticated')",[a,`${a}@semillero-test.invalid`,b,`${b}@semillero-test.invalid`]);
  async function asUser(uid){await db.query('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,true),set_config('request.jwt.claims',$2,true)",[uid,JSON.stringify({sub:uid,role:'authenticated'})]);await db.query('set local role authenticated');}
  async function denied(sql,params,code){await db.query('savepoint denial');try{await db.query(sql,params);assert.fail('Una operación restringida fue aceptada.');}catch(e){await db.query('rollback to savepoint denial');assert.equal(e.code,code);}finally{await db.query('release savepoint denial');}}
  const send=r=>db.query('select public.receive_seed($1::jsonb) as receipt',[JSON.stringify(r)]);
  await asUser(a);
  const first=(await send(record)).rows[0].receipt;
  assert.deepEqual((await send(record)).rows[0].receipt,first);
  await denied('select public.receive_seed($1::jsonb)',[JSON.stringify({...record,title:'Sobrescritura'})],'23505');
  await denied("update public.seed_versions set original='{}'",[],'42501');
  assert.equal((await send({...record,version:2,question:'Una corrección explícita'})).rows[0].receipt.version,2);
  await asUser(b);
  assert.equal((await db.query('select * from public.seed_versions where seed_id=$1',[id])).rows.length,0);
  await denied('select public.receive_seed($1::jsonb)',[JSON.stringify(record)],'42501');
  await db.query('reset role');await db.query('set local role anon');
  await denied('select public.receive_seed($1::jsonb)',[JSON.stringify(record)],'42501');
  await db.query('rollback');
  assert.equal((await db.query('select 1 from public.seeds where id=$1',[id])).rowCount,0);
  assert.equal((await db.query('select 1 from auth.users where id=any($1::uuid[])',[[a,b]])).rowCount,0);
  const {supabaseUrl,publishableKey}=connected.publicConfig;
  const response=await fetch(`${supabaseUrl}/rest/v1/bulletins?select=id&limit=1`,{headers:{apikey:publishableKey},signal:AbortSignal.timeout(15000)});
  assert.equal(response.status,200);
  const privateResponse=await fetch(`${supabaseUrl}/rest/v1/seed_versions?select=receipt_id&limit=1`,{headers:{apikey:publishableKey},signal:AbortSignal.timeout(15000)});
  assert.ok([401,403].includes(privateResponse.status));
  console.log(JSON.stringify({live_sql_passed:true,idempotency:true,corrections:true,owner_isolation:true,anonymous_reception_denied:true,synthetic_data_rolled_back:true,public_api_status:response.status,private_api_status:privateResponse.status},null,2));
}catch(e){if(db)await db.query('rollback').catch(()=>{});console.error('Verificación remota incompleta.',e.code||e.name);process.exitCode=1;}
finally{if(db)await db.end().catch(()=>{});}
