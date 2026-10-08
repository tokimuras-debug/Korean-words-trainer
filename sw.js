const CACHE='korean-word-trainer-v6-20261008';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-512.png','./3A.json','./grammar_3A.json','./grammar_practice_3A.json','./cloze_3A.json'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);const dynamic=u.pathname.endsWith('.json')||u.pathname.endsWith('index.html')||u.pathname.endsWith('/');if(dynamic){e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));}else{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));}});
