const cacheName = 'translator-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './renderer.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Устанавливаем и кешируем
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(assets))
      .then(() => self.skipWaiting())
  );
});

// Отдаём из кеша или сеть
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
