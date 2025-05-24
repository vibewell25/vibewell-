importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;
const { precacheAndRoute } = workbox.precaching;

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache page navigations (HTML)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
      }),
    ],
  })
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  })
);

// Cache images with a Cache First strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  })
);

// Create a background sync queue for API requests
const apiBackgroundSyncPlugin = new BackgroundSyncPlugin('api-queue', {
  maxRetentionTime: 24 * 60, // Retry for up to 24 hours (in minutes)
});

// Handle API requests with NetworkFirst and background sync for POST/PUT/DELETE
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  async ({ request }) => {
    const strategy = new NetworkFirst({
      cacheName: 'api-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 12, // 12 hours
        }),
      ],
    });

    // For POST/PUT/DELETE requests, use background sync
    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
      try {
        return await fetch(request.clone());
      } catch (error) {
        // If the request fails, add it to the background sync queue
        await apiBackgroundSyncPlugin.queueRequest({ request });
        return new Response('Request queued for background sync', {
          status: 202,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    }

    // For other requests, use the standard strategy
    return strategy.handle({ request });
  }
);

// Listen for the sync event to replay queued requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'api-queue') {
    event.waitUntil(self.apiBackgroundSyncPlugin.replayRequests());
  }
});

// Skip the waiting phase and activate immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 