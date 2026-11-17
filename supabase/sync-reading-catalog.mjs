import {readFile} from 'node:fs/promises';
import {parseArgs} from 'node:util';
import {connection} from './connection.mjs';
const {values}=parseArgs({options:{config:{type:'string'},host:{type:'string'},user:{type:'string'},ca:{type:'string'},catalog:{type:'string'},migrate:{type:'boolean',default:false}}});
let client;
try {
  const data=JSON.parse(await readFile(values.catalog,'utf8'));
  if(data.group_id!==6712171 || !Array.isArray(data.references))throw Error('Catálogo de grupo incorrecto.');
  const keys=data.references.map(row=>row.zotero_key);
  if(new Set(keys).size!==keys.length || keys.some(key=>!/^[A-Z0-9]{8}$/.test(key)))throw Error('Claves de catálogo no válidas.');
  ({client}=await connection(values));
  if(values.migrate && !(await client.query("select to_regclass('public.reading_references') as existing")).rows[0].existing)
    await client.query(await readFile(new URL('./migrations/202611170001_lecturas_catalogo.sql',import.meta.url),'utf8'));
  await client.query('begin');
  for(const row of data.references){
    if(row.group_id!==6712171)throw Error('Referencia de otro grupo.');
    await client.query(`insert into public.reading_references(zotero_key,title,citation,url,source_version)
      values($1,$2,$3,$4,$5) on conflict(zotero_key) do update set title=excluded.title,
      citation=excluded.citation,url=excluded.url,source_version=excluded.source_version,active=true,synced_at=now()`,
      [row.zotero_key,row.title,row.citation,row.url,row.source_version]);
  }
  await client.query('update public.reading_references set active=false where not(zotero_key=any($1::text[]))',[keys]);
  const count=(await client.query('select count(*)::int as n from public.reading_references where active')).rows[0].n;
  if(count!==keys.length)throw Error('El cotejo del catálogo no coincide.');
  await client.query('commit');
  console.log(JSON.stringify({group:6712171,references:count,readback_verified:true,zotero_writes:0}));
}catch(e){if(client)await client.query('rollback').catch(()=>{});console.error('No se completó la sincronización del catálogo.',e.code||e.name);process.exitCode=1;}
finally{if(client)await client.end().catch(()=>{});}
