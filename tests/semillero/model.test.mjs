import {test} from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
globalThis.crypto ??= webcrypto;
import {newRecord,validate,markdown,sameContent,sha256} from '../../blog/app/model.mjs';
import {Api} from '../../blog/app/api.mjs';
import {swipeDirection} from '../../blog/app/navigation.mjs';
const complete=()=>({...newRecord(),author:'Participante',title:'Una pregunta',question:'¿Qué podemos observar?',motivation:'Distinguir observación y condición.'});
test('horizontal navigation ignores vertical gestures and accidental short moves',()=>{
 assert.equal(swipeDirection({x:200,y:100},{x:100,y:110}),1);
 assert.equal(swipeDirection({x:100,y:100},{x:200,y:110}),-1);
 assert.equal(swipeDirection({x:100,y:100},{x:105,y:230}),0);
 assert.equal(swipeDirection({x:100,y:100},{x:145,y:100}),0);
});
test('browser fetch is called through a wrapper rather than as an Api method',async()=>{
 const original=globalThis.fetch;
 try{
  globalThis.fetch=async function(){assert.ok(!(this instanceof Api));return new Response('[]');};
  const a=new Api({supabaseUrl:'https://example.org',publishableKey:'sb_publishable_example'});
  assert.deepEqual(await a.events(),[]);
 }finally{globalThis.fetch=original;}
});
test('round trip JSON preserves original, identity and version',()=>{const a=complete();assert.deepEqual(validate(JSON.parse(JSON.stringify(a))),a);assert.match(markdown(a),/¿Qué podemos observar\?/);assert.match(markdown(a),/Pendientes de revisión/);assert.ok(sameContent(a,{...a}));assert.ok(!sameContent(a,{...a,question:'Otra pregunta'}));});
test('rejects missing content, malformed imports, oversize files and unsupported extensions',()=>{assert.throws(()=>validate(newRecord()));assert.throws(()=>validate({...complete(),version:1.5}));assert.throws(()=>validate({...complete(),schema:'other'}));assert.throws(()=>validate({...complete(),attachment:{name:'x.exe',size:1,sha256:'a'.repeat(64)}}));assert.throws(()=>validate({...complete(),attachment:{name:'x.pdf',size:5242881,sha256:'a'.repeat(64)}}));validate(newRecord(),false);});
test('SHA256 known independent vector',async()=>assert.equal(await sha256(new TextEncoder().encode('abc')),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'));
test('rejects administrative keys and non-TLS endpoints',()=>{assert.throws(()=>new Api({supabaseUrl:'http://example.org',publishableKey:'sb_publishable_example'}));assert.throws(()=>new Api({supabaseUrl:'https://example.org',publishableKey:'sb_secret_example'}));const token=`a.${btoa(JSON.stringify({role:'service_role'}))}.z`;assert.throws(()=>new Api({supabaseUrl:'https://example.org',publishableKey:token}));});
test('no fake receipt on network failure; successful submission uses stable record',async()=>{const calls=[];const a=new Api({supabaseUrl:'https://example.org',publishableKey:'sb_publishable_example'},async(url,options)=>{calls.push({url,options});throw Error('network lost');});a.session={access_token:'test',user:{id:'owner'}};const r=complete();await assert.rejects(a.submit(r),/network lost/);assert.equal(JSON.parse(calls[0].options.body).p_record.id,r.id);assert.equal(calls[0].options.cache,'no-store');a.fetcher=async()=>new Response(JSON.stringify({receipt_id:'real-receipt',version:1}),{status:200});assert.equal((await a.submit(r)).receipt_id,'real-receipt');});
test('OTP requests cannot create new users; logout clears local session even on failure',async()=>{let body;const a=new Api({supabaseUrl:'https://example.org',publishableKey:'sb_publishable_example'},async(u,o)=>{body=JSON.parse(o.body||'{}');return new Response('{}');});await a.otp('user@example.org');assert.equal(body.create_user,false);a.session={access_token:'test'};a.fetcher=async()=>{throw Error('offline');};await assert.rejects(a.logout());assert.equal(a.session,null);});
test('lost upload response: identical private object is verified before retrying reception',async()=>{
 const bytes=new TextEncoder().encode('abc'), calls=[];
 const r={...complete(),attachment:{name:'fuente.txt',size:3,sha256:await sha256(bytes)}};
 const a=new Api({supabaseUrl:'https://example.org',publishableKey:'sb_publishable_example'},async(url,o)=>{
   calls.push(url);
   if(url.includes('/object/authenticated/'))return new Response(bytes);
   if(url.includes('/object/'))return new Response(JSON.stringify({message:'already exists'}),{status:409});
   return new Response(JSON.stringify({receipt_id:'confirmed'}));
 });
 a.session={access_token:'test',user:{id:'owner'}};
 assert.equal((await a.submit(r,{arrayBuffer:async()=>bytes.buffer})).receipt_id,'confirmed');
 assert.equal(calls.length,3);
 await assert.rejects(a.submit(r,{arrayBuffer:async()=>new TextEncoder().encode('different').buffer}),/Selecciona de nuevo/);
});
