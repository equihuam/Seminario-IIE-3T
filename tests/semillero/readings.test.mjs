import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {createCatalogSync} from '../../supabase/functions/sync-reading-catalog/handler.mjs';
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


test('Edición propia, historial, conflictos y columnas protegidas',async()=>{
 const db=new PGlite();
 try {
  await createSchema(db);
  for(const file of ['202611130001_lecturas.sql','202611130002_lecturas_zotero.sql','202611170001_lecturas_catalogo.sql','202611180001_edicion_aportaciones.sql'])
   await db.exec(await readFile(new URL('../../supabase/migrations/'+file,import.meta.url),'utf8'));
  const a=crypto.randomUUID(), b=crypto.randomUUID();
  for(const id of [a,b])await db.query('insert into auth.users(id) values($1)',[id]);
  await db.query("insert into reading_members values($1,'Autora',false),($2,'Coordinador',true)",[a,b]);
  await db.exec("insert into reading_references(zotero_key,title,citation,source_version) values('AAAAAAAA','Fuente','Cita',1)");
  const login=async id=>{await db.exec('reset role;set role authenticated');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);};
  await login(a);
  const id=crypto.randomUUID(), comment=crypto.randomUUID();
  await db.query("insert into readings(id,zotero_key,question,processing) values($1,'AAAAAAAA','Original','Discusión')",[id]);
  await db.query("insert into reading_comments(id,reading_id,body) values($1,$2,'Comentario original')",[comment,id]);
  let result=await db.query("update readings set question='Corrección' where id=$1 and revision=1 returning revision,edited_at",[id]);
  assert.equal(result.rows[0].revision,2);assert.ok(result.rows[0].edited_at);
  assert.equal((await db.query("update readings set question='Obsoleta' where id=$1 and revision=1 returning id",[id])).rows.length,0);
  await assert.rejects(db.exec("update readings set processing=' '"),{code:'23514'});
  await db.query("update reading_comments set body='Comentario corregido' where id=$1",[comment]);
  for(const assignment of ["owner_id='"+b+"'","title='Falsa'","revision=9","zotero_key='BBBBBBBB'"])
   await assert.rejects(db.exec('update readings set '+assignment),{code:'42501'});
  await assert.rejects(db.exec("update reading_comments set body=' '"),{code:'23514'});
  await assert.rejects(db.exec('select * from reading_edit_history'),{code:'42501'});
  await login(b);
  for(const table of ['readings','reading_comments'])
   assert.equal((await db.exec("update "+table+" set "+(table==='readings'?"question='Ajena'":"body='Ajeno'")+" returning *"))[0].rows.length,0);
  await db.exec('reset role');
  const history=(await db.query('select * from reading_edit_history order by entry_table')).rows;
  assert.equal(history.length,2);
  assert.equal(history.find(r=>r.entry_table==='readings').original.question,'Original');
  assert.equal(history.find(r=>r.entry_table==='reading_comments').original.body,'Comentario original');
  await db.query('delete from reading_members where user_id=$1',[b]);
  await login(b);
  assert.equal((await db.query('select * from readings')).rows.length,0);
  await db.exec('reset role;set role anon');
  await assert.rejects(db.exec("update readings set question='Anónima'"),{code:'42501'});
 } finally {await db.close();}
});

test('Cliente rechaza autor ajeno y conflicto, y envía solo campos editables',async()=>{
 const {saveOwnEdit}=await import('../../blog/app/editing.mjs');
 const row={id:'entry',owner_id:'author',revision:3};
 let calls=0;
 const api={session:{user:{id:'author'}},request:async(path,options)=>{
  calls++;assert.match(path,/revision=eq.3/);assert.equal(options.method,'PATCH');
  assert.deepEqual(options.body,{question:'Corrección'});return [{...row,revision:4}];
 }};
 assert.equal((await saveOwnEdit(api,'readings',row,{question:'Corrección',owner_id:'forged'})).revision,4);
 api.session.user.id='other';
 await assert.rejects(saveOwnEdit(api,'readings',row,{}),/propias/);assert.equal(calls,1);
 api.session.user.id='author';api.request=async()=>[];
 await assert.rejects(saveOwnEdit(api,'readings',row,{}),/entrada cambió/);
});


test('La sincronización comprueba membresía y solo envía a escritura una lectura completa de Zotero',async()=>{
 const page=(rows,version,total)=>Response.json(rows,{headers:{'Last-Modified-Version':version,'Total-Results':total}});
 const item=(key)=>({key,version:5,data:{itemType:'webpage',title:'Carta abierta',DOI:'10.1000/demo'},bib:'<div>Cita de la carta</div>'});
 const request=()=>new Request('https://project.example/functions/v1/sync-reading-catalog',{
   method:'POST',headers:{Authorization:'Bearer member-token',Origin:'https://board.example'}
 });
 const env=name=>({SUPABASE_URL:'https://project.example',SUPABASE_ANON_KEY:'anon-key',
   SUPABASE_SERVICE_ROLE_KEY:'service-key',READING_ZOTERO_API_KEY:'zotero-read-key'})[name];
 for(const scenario of ['outsider','invalid-session','incomplete','changed-version','success']){
   let zoteroCalls=0, writeCalls=0;
   const handler=createCatalogSync(env,x=>x,async(url,options)=>{
     if(url.endsWith('/can_access_readings')){
       assert.equal(options.headers.Authorization,'Bearer member-token');
       if(scenario==='invalid-session')return new Response(null,{status:401});
       return Response.json(scenario!=='outsider');
     }
     if(url.startsWith('https://api.zotero.org/')){
       zoteroCalls++;
       assert.equal(options.headers['Zotero-API-Key'],'zotero-read-key');
       assert.equal(options.method,undefined);
       if(scenario==='incomplete')return page([],6,1);
       if(scenario==='changed-version'){
         if(zoteroCalls===2)return page([item('BBBBBBBB')],7,101);
         return page(Array.from({length:100},(_,i)=>item(String(i).padStart(8,'0'))),6,101);
       }
       return page([item('AAAAAAAA'),{key:'BBBBBBBB',version:5,data:{itemType:'note'}}],6,2);
     }
     assert.match(url,/\/apply_reading_catalog$/);
     assert.equal(options.headers.Authorization,'Bearer service-key');
     assert.deepEqual(JSON.parse(options.body),{catalog_version:6,catalog_rows:[{
       zotero_key:'AAAAAAAA',title:'Carta abierta',citation:'Cita de la carta',
       url:'https://doi.org/10.1000/demo',source_version:5
     }]});
     writeCalls++;
     return Response.json(true);
   });
   const preflight=await handler(new Request('https://project.example',{method:'OPTIONS'}));
   assert.equal(preflight.status,204);
   const response=await handler(request());
   assert.equal(response.status,({outsider:403,'invalid-session':401,incomplete:503,'changed-version':503,success:200})[scenario]);
   assert.equal(response.headers.get('Access-Control-Allow-Origin'),'*');
   assert.equal(zoteroCalls,({outsider:0,'invalid-session':0,incomplete:1,'changed-version':2,success:1})[scenario]);
   assert.equal(writeCalls,scenario==='success'?1:0);
 }
});

test('La base aplica el catálogo completo de forma atómica y descarta versiones anteriores',async()=>{
 const db=new PGlite();
 try{
   await createSchema(db);
   await db.exec('create role service_role');
   for(const file of ['202611130001_lecturas.sql','202611130002_lecturas_zotero.sql',
     '202611170001_lecturas_catalogo.sql','202611270001_sync_reading_catalog.sql']){
     await db.exec(await readFile(new URL('../../supabase/migrations/'+file,import.meta.url),'utf8'));
   }
   const apply=(version,rows)=>db.query('select apply_reading_catalog($1,$2::jsonb) as applied',[version,JSON.stringify(rows)]);
   const keys=async()=> (await db.query('select zotero_key,active from reading_references order by zotero_key')).rows;
   const entry={zotero_key:'AAAAAAAA',title:'Fuente',citation:'Cita',url:'',source_version:9};
   await db.exec('set role authenticated');
   await assert.rejects(apply(9,[entry]),{code:'42501'});
   await db.exec('reset role; set role service_role');
   assert.equal((await apply(9,[entry])).rows[0].applied,true);
   assert.equal((await apply(8,[])).rows[0].applied,false);
   assert.equal((await apply(9,[])).rows[0].applied,false);
   await assert.rejects(apply(10,[{...entry,zotero_key:'BBBBBBBB'},{...entry,title:''}]),{code:'23514'});
   await db.exec('reset role');
   assert.deepEqual(await keys(),[{zotero_key:'AAAAAAAA',active:true}]);
   await db.exec('set role service_role');
   assert.equal((await apply(10,[{...entry,zotero_key:'BBBBBBBB'}])).rows[0].applied,true);
   await db.exec('reset role');
   assert.deepEqual(await keys(),[{zotero_key:'AAAAAAAA',active:false},{zotero_key:'BBBBBBBB',active:true}]);
   assert.equal((await db.query('select count(*)::int as count from readings')).rows[0].count,1);
 }finally{await db.close();}
});
