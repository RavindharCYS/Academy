// Academy/service-worker.js

const CACHE_NAME = 'sma-cache-v1'; // Change version number when you update assets

// List of essential files to cache on install
const CORE_ASSETS = [
  '/', // Cache the root URL (homepage)
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/logo.jpeg', // Cache your main logo
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/icon-192.png', // Cache the PWA icons
  '/icon-512.png',
  // Add other absolutely essential CSS/JS files if any (e.g., a core script.js)
  // Bootstrap/FontAwesome from CDN are often cached by the browser,
  // but you could add their URLs here for more robust offline capability.
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://code.jquery.com/jquery-3.6.0.min.js'
  // Add paths to your sub-pages' index.html if you want them pre-cached
  // '/Career/', '/Career/index.html', '/CyberSecurity/', '/CyberSecurity/index.html', etc.
  // Be mindful of cache size if you pre-cache too much.
];

// --- INSTALLATION ---
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Activate the new SW immediately
      .catch(error => {
        console.error('Service Worker: Caching failed', error);
      })
  );
});

// --- ACTIVATION ---
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of existing clients
  );
});

// --- FETCH (Intercepting Network Requests) ---
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests (like POST to EmailJS)
  if (event.request.method !== 'GET') {
    return;
  }

  // Cache-First strategy for navigation requests (HTML pages)
  // and potentially other assets during runtime.
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 1. Try to get from cache
        if (cachedResponse) {
          // console.log('Service Worker: Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // 2. Not in cache, fetch from network
        // console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((networkResponse) => {
            // 3. If fetch is successful, cache the response for next time
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone(); // Clone because response streams can only be read once
              caches.open(CACHE_NAME)
                .then((cache) => {
                  // console.log('Service Worker: Caching new resource:', event.request.url);
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          })
          .catch(error => {
            // Network fetch failed (likely offline)
            console.error('Service Worker: Fetch failed; returning offline fallback if available.', error);
            // Optional: Return a generic offline fallback page
            // return caches.match('/offline.html'); // You would need to create and cache offline.html
          });
      })
  );
});