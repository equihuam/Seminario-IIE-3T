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
  async request(path, {method='GET',body,raw=false}={}) {
    const headers={apikey:this.key};
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
  async verify(email,token) {this.session=await this.request('/auth/v1/verify',{method:'POST',body:{email,token,type:'email'}});return this.session;}
  async logout() {try {await this.request('/auth/v1/logout',{method:'POST'});} finally {this.session=null;}}
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
