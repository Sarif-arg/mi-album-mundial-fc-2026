const CACHE_NAME = 'album-mundial-2026-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Only intercept HTTP/HTTPS queries (ignore chrome-extension, etc.)
  if (e.request.url.startsWith('http')) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request);
      })
    );
  }
});
