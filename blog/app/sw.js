const CACHE='iie-semillero-v1-2';
const SHELL=['./','./index.html','./app.css','./app.mjs','./install.mjs','./calendar.mjs','./session-card.mjs','./agenda-notes.mjs','./wizard.mjs','./navigation.mjs','./model.mjs','./editing.mjs','./readings.mjs','./reading-catalog.mjs','./api.mjs','./icon.svg','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('iie-semillero-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!SHELL.some(p=>new URL(p,self.registration.scope).pathname===url.pathname))return;
  // Only the public shell is cached: never config, API responses, tokens or files.
  event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(event.request,copy)));}return response;}).catch(()=>caches.match(event.request)));
});
