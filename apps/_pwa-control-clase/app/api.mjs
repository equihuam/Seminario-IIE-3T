import { sha256 } from './model.mjs';
export class Api {
  constructor(config, fetcher = (...args) => fetch(...args)) {
    const url = new URL(config.supabaseUrl);
    if (url.protocol !== 'https:' || !config.publishableKey || /^(sb_secret_)/.test(config.publishableKey)) throw Error('Configuración pública de Supabase no válida.');
    // Legacy anon JWT is allowed, service_role is never allowed in browser config.
    const parts = config.publishableKey.split('.');
    if (parts.length === 3) {
      try { if (JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/'))).role !== 'anon') throw Error(); }
      catch { throw Error('Usa una clave publicable o anon, nunca una clave administrativa.'); }
    }
    this.url=url.origin; this.key=config.publishableKey; this.fetcher=fetcher; this.session=null;
  }
  get storageKey() { return 'iie-auth:'+this.url; }
  restore(storage) {
    this.storage=storage;
    let saved;
    try { saved=JSON.parse(storage.getItem(this.storageKey)); } catch { return; }
    if (saved?.user?.id && saved.access_token && saved.refresh_token && Number.isFinite(saved.expires_at)) {
      this.session=saved;
      this.remembered=true;
    }
  }
  forget() {
    if(this.remembered) this.storage.removeItem(this.storageKey);
    this.remembered=false;
    this.session=null;
  }
  async ready() {
    const session=this.session;
    if(!session?.refresh_token || session.expires_at>Date.now()/1000+60) return;
    if(!this.refreshing) {
      const renew=async()=>{
        if(this.session!==session) throw Error('La sesión cambió. Vuelve a abrir el tablero.');
        if(this.remembered) {
          const saved=JSON.parse(this.storage.getItem(this.storageKey));
          if(!saved || saved.user.id!==session.user.id) {
            this.remembered=false;this.session=null;this.onExpired?.();
            throw Error('Vuelve a entrar con tu cuenta.');
          }
          Object.assign(session,saved);
          if(session.expires_at>Date.now()/1000+60) return;
        }
        try {
          const next=await this.transport('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:session.refresh_token}});
          if(this.session!==session) throw Error('La sesión cambió.');
          Object.assign(session,next);
          if(this.remembered) this.storage.setItem(this.storageKey,JSON.stringify(session));
        } catch(error) {
          if([400,401,403].includes(error.status) && this.session===session) {this.forget();this.onExpired?.();}
          throw error;
        }
      };
      const job=this.remembered && globalThis.navigator?.locks ? navigator.locks.request(this.storageKey,renew) : renew();
      this.refreshing=job.finally(()=>{this.refreshing=null;});
    }
    await this.refreshing;
  }
  async request(path,options) {
    if(!path.startsWith('/auth/')) await this.ready();
    return this.transport(path,options);
  }
  async transport(path, {method='GET',body,raw=false,returnRows=false}={}) {
    const headers={apikey:this.key};
    if(returnRows) headers.Prefer='return=representation';
    if(this.session) headers.Authorization=`Bearer ${this.session.access_token}`;
    if(body!==undefined) headers['Content-Type']=raw ? 'application/octet-stream' : 'application/json';
    const response=await this.fetcher(this.url+path,{method,headers,body:body===undefined?undefined:raw?body:JSON.stringify(body),cache:'no-store',signal:AbortSignal.timeout(20000)});
    if(!response.ok) {
      const error=await response.json().catch(()=>({}));
      const e=Error(response.status===401?'Tu sesión terminó. Vuelve a entrar.':error.message || error.msg || `El servicio respondió ${response.status}.`); e.status=response.status; throw e;
    }
    if(raw) return response.arrayBuffer();
    return response.status===204?null:response.json();
  }
  otp(email) {return this.request('/auth/v1/otp',{method:'POST',body:{email,create_user:false}});}
  async verify(email,token,remember=false) {
    this.session=await this.transport('/auth/v1/verify',{method:'POST',body:{email,token,type:'email'}});
    if(remember) {
      try {this.storage.setItem(this.storageKey,JSON.stringify(this.session));this.remembered=true;}
      catch {this.remembered=false;}
    }
    return this.session;
  }
  async logout() {try {await this.ready();await this.transport('/auth/v1/logout?scope=local',{method:'POST'});} finally {this.forget();}}
  async upload(record,file) {
    const path=`${this.session.user.id}/${record.id}/${record.version}/${record.attachment.sha256}`;
    try {await this.request(`/storage/v1/object/originales/${path}`,{method:'POST',body:await file.arrayBuffer(),raw:true});}
    catch(error) {
      // A previous upload may have succeeded even if its response was lost.
      if(![400,409].includes(error.status)) throw error;
      const bytes=await this.request(`/storage/v1/object/authenticated/originales/${path}`,{raw:true});
      if(await sha256(bytes)!==record.attachment.sha256) throw Error('El archivo existente no coincide con el original.');
    }
  }
  async submit(record,file) {
    if(!this.session) throw Error('Primero entra con tu correo.');
    if(record.attachment) {
      if(!file || await sha256(await file.arrayBuffer())!==record.attachment.sha256) throw Error('Selecciona de nuevo el documento original correspondiente a este registro.');
      await this.upload(record,file);
    }
    return this.request('/rest/v1/rpc/receive_seed',{method:'POST',body:{p_record:record}});
  }
  mine() {return this.request('/rest/v1/seed_versions?select=seed_id,version,receipt_id,received_at,original&order=received_at.desc&limit=100');}
  events() {return this.request('/rest/v1/bulletins?select=id,kind,title,body,starts_at,status,updated_at&order=starts_at.asc.nullslast&limit=100');}
}
