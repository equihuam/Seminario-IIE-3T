import {readFile} from 'node:fs/promises';
import pg from 'pg';

export async function connection(options){
  if(!options.config)throw Error('Se requiere --config con la ruta del archivo privado.');
  const config=JSON.parse((await readFile(options.config,'utf8')).replace(/^\uFEFF/,''));
  const ref=new URL(config.supabaseUrl).hostname.split('.')[0];
  const d=config.database;
  const host=options.host||d.host;
  if(!host||host.includes('HOST_'))throw Error('Falta un host verificado en Connect.');
  if(!host.endsWith('.supabase.co')&&!host.endsWith('.pooler.supabase.com'))throw Error('El host no corresponde a Supabase.');
  const user=options.user||d.user;
  if(host.endsWith('.pooler.supabase.com')&&user!==`postgres.${ref}`)throw Error('El usuario del pooler no corresponde al proyecto.');
  const ca=options.ca?await readFile(options.ca,'utf8'):undefined;
  const client=new pg.Client({host,port:d.port||5432,database:d.name||'postgres',user,password:d.password,ssl:{rejectUnauthorized:true,...(ca?{ca}:{})},connectionTimeoutMillis:15000,query_timeout:20000,application_name:'semillero-v0-admin'});
  await client.connect();
  return {client,ref,host,user,publicConfig:{supabaseUrl:config.supabaseUrl,publishableKey:config.publishableKey}};
}
