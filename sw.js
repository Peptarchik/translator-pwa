// sw.js — самый простой “noop”–воркер
self.addEventListener('install', event => {
  // сразу заставляем воркер активироваться
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // берём управление сразу
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // просто проксируем все запросы без кэша
  event.respondWith(fetch(event.request));
});

