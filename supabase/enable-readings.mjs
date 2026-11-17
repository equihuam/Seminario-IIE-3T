import {readFile} from 'node:fs/promises';
import {connection} from './connection.mjs';
const [config, miguelId, octavioEmail] = process.argv.slice(2);
const {client,ref} = await connection({config,host:'aws-1-us-east-1.pooler.supabase.com',user:'postgres.owqoinfndqzqwiiiexks',ca:'.local/supabase-ca.crt'});
try {
  if(ref!=='owqoinfndqzqwiiiexks')throw Error('Proyecto inesperado');
  await client.query('begin');
  const people = await client.query('select id, id=$1::uuid as miguel from auth.users where id=$1::uuid or lower(email)=lower($2)',[miguelId,octavioEmail]);
  if(people.rowCount!==2)throw Error('Verificar las dos cuentas existentes.');
  const migration=await readFile(new URL('./migrations/202611130001_lecturas.sql',import.meta.url),'utf8');
  if(!(await client.query("select to_regclass('public.readings') as existing")).rows[0].existing)
    await client.query(migration.replace(/^begin;$/m,'').replace(/^commit;$/m,''));
  for(const person of people.rows) await client.query('insert into public.reading_members values($1,$2,true) on conflict(user_id) do nothing',[person.id,person.miguel?'Miguel':'Octavio']);
  for(const person of people.rows){
    await client.query('set local role authenticated');
    await client.query("select set_config('request.jwt.claim.sub',$1,true)",[person.id]);
    const result=await client.query("select count(*) as n from public.readings where url='https://doi.org/10.1002/wcc.915' and public.can_access_readings(true)");
    if(Number(result.rows[0].n)!==1)throw Error('Falló la lectura autenticada.');
    await client.query('reset role');
  }
  await client.query('commit');
  console.log('Saltelli verificado con ambos identificadores Auth y permisos de coordinación.');
} finally {await client.end();}
