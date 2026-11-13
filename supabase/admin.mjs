// Local administrative tool. Credentials are read from a file, never argv/output.
import {readFile} from 'node:fs/promises';
import {parseArgs} from 'node:util';
import {connection} from './connection.mjs';
const {values}=parseArgs({options:{config:{type:'string'},host:{type:'string'},user:{type:'string'},ca:{type:'string'},apply:{type:'boolean',default:false}}});
let client;
try {
  const connected=await connection(values);
  client=connected.client;
  const {ref,host,user}=connected;
  await client.query('begin read only');
  const version=await client.query("select current_database() as database, current_setting('server_version') as version");
  const existing=await client.query("select table_name from information_schema.tables where table_schema='public' and table_type='BASE TABLE' order by table_name");
  const policies=await client.query("select policyname,cmd from pg_policies where schemaname='storage' and tablename='objects'");
  const buckets=await client.query("select id,public from storage.buckets where id='originales'");
  await client.query('commit');
  console.log(JSON.stringify({connected:true,tls_verified:true,projectRef:ref,host,user,database:version.rows[0],public_tables:existing.rows.map(r=>r.table_name),storage_policies:policies.rows,originales_bucket:buckets.rows},null,2));
  if(values.apply){
    const names=['seeds','seed_versions','seed_reviews','bulletins','bulletin_history'];
    if(existing.rows.some(r=>names.includes(r.table_name))||buckets.rows.length)throw Error('Existen objetos del Semillero; no se reaplica ni reemplaza la migración.');
    if(policies.rows.length)throw Error('Hay políticas Storage preexistentes: revisar alcance antes de aplicar.');
    await client.query(await readFile(new URL('./migrations/202611120001_semillero.sql',import.meta.url),'utf8'));
    const check=await client.query("select tablename,rowsecurity from pg_tables where schemaname='public' and tablename=any($1::text[])",[names]);
    if(check.rows.length!==5||check.rows.some(r=>!r.rowsecurity))throw Error('La verificación posterior requiere revisión.');
    console.log(JSON.stringify({migration_applied:true,readback:check.rows},null,2));
  }
}catch(e){
  // Do not print connection strings, passwords, query text or error objects.
  const safeCodes=['28P01','28000','ENETUNREACH','ETIMEDOUT','ENOTFOUND','ECONNREFUSED','UNABLE_TO_VERIFY_LEAF_SIGNATURE','SELF_SIGNED_CERT_IN_CHAIN','CERT_HAS_EXPIRED'];
  console.error('No se completó la operación.',safeCodes.includes(e.code)?`Código: ${e.code}`:e.code?'Error de base/configuración.':String(e.message).replace(/postgres(?:ql)?:\/\/\S+/g,'[CONEXIÓN REDACTADA]'));
  process.exitCode=1;
}finally{if(client)await client.end().catch(()=>{});}
