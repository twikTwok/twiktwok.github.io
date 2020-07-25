// This is the "Offline page" service worker

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

const CACHE = "pwabuilder-page";
const staticCacheName = "site-static";
const assets = [
  "../vidData.js",
  "../index.js",
  "../test2.html",
  "../test.js",
  "../index.html",
  "/",
  "../style.css",
  "../swiper/swiper.min.css",
  "../swiper/swiper.min.js",
  "https://kit.fontawesome.com/aae682fcfb.js",
  "../swiper/manUp.js",
];
// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "./offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", async (event) => {
  caches.open(staticCacheName).then((cache) => {
    console.log("caching assets...");
    cache.addAll(assets);
  });
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })()
    );
  }
});
