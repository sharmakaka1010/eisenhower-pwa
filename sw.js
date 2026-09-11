/* ===================================================================
   Eisenhower Matrix PWA - Service Worker
   Offline caching, lifecycle management, and notification click router
   =================================================================== */

const CACHE_NAME = 'eisenhower-matrix-v1.1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Install: Cache critical static assets immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate: Purge obsolete caches and claim active clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: NETWORK-FIRST Strategy
// This guarantees users always see the latest code from GitHub on reload,
// preventing the need to manually clear site data (which deletes localStorage).
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If the network request is successful, clone the response
        // and put it in the cache, then return the network response.
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch((err) => {
        // If the network request fails (e.g., offline), fallback to the cache.
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If navigating to a page and offline, fallback to cached index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          throw err;
        });
      })
  );
});

// Notification click: Focus existing app window or open a new one
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('./index.html');
      }
    })
  );
});

// Message listener for background triggers or skipWaiting commands
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
