const VERSION = "v1";
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const API_CACHE = `api-${VERSION}`;
const OFFLINE_URL = "/offline.html";
const APP_SHELL = [
  "/",
  OFFLINE_URL,
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys
          .filter(
            (key) =>
              ![
                STATIC_CACHE,
                RUNTIME_CACHE,
                API_CACHE,
              ].includes(key)
          )
          .map((staleKey) => caches.delete(staleKey))
      );

      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }

      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(event));
    return;
  }

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    if (url.pathname.startsWith("/_next/static/")) {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
      return;
    }

    if (
      ["style", "script", "font", "image"].includes(request.destination)
    ) {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
      return;
    }

    if (isApiRequest(url.pathname)) {
      event.respondWith(networkFirstApi(request));
      return;
    }
  }
});

function isApiRequest(pathname) {
  return (
    pathname.startsWith("/api/note") ||
    pathname.startsWith("/api/rg") ||
    pathname.startsWith("/api/weather")
  );
}

async function handleNavigationRequest(event) {
  const { request } = event;
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      cache.put(request, preloadResponse.clone());
      return preloadResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn("[sw] Navigation request failed, falling back to cache", error);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const offlineFallback = await caches.match(OFFLINE_URL);
    if (offlineFallback) {
      return offlineFallback;
    }

    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response && response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirstApi(request) {
  const cache = await caches.open(API_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn("[sw] API request failed, falling back to cache", error);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    return new Response(JSON.stringify({ error: "offline" }), {
      status: 503,
      statusText: "Service Unavailable",
      headers: { "Content-Type": "application/json" },
    });
  }
}
