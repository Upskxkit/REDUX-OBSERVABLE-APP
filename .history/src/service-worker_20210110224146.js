/* eslint-disable no-restricted-globals */

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
/* self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
 */

const version = 4;
const cacheName = `redux-app-cache-${version}`;
const urlsToCache = [{ revision: "", url: "/" }, ...self.__WB_MANIFEST];

self.addEventListener("install", handleInstall);
self.addEventListener("activate", handleActivation);
self.addEventListener("fetch", onFetch);

main().catch(console.error);

//-------------------------------------

async function main() {
  await cacheFiles();
  console.log("service worker", urlsToCache);
}

async function handleInstall() {
  self.skipWaiting();
  console.log(`Service Worker (${version}) installed;`);
}

function handleActivation(event) {
  console.log("activating start");
  event.waitUntil(onActivation);
  console.log("activating end");
}

async function onActivation() {
  await cacheClear();
  await clients.claim();
  await cacheFiles(/*forceLoad= */ true);
  console.log(`Service Worker (${version}) activated;`);
}

function onFetch(event) {
  event.respondWith(router(event.request));
}

async function router(req) {
  let url = URL(req.url);
  let reqUrl = url.pathname;
  let cache = caches.open(cacheName);

  if (url.origin === location.origin) {
    let fetchOptions = {
      method: req.method,
      headers: req.headers,
      cache: "no-cache",
      credentials: "omit",
    };

    let res = await fetch(url, fetchOptions);

    if (res.ok) {
      await cache.put(url, res.clone());
      return res;
    }
  }
}

async function cacheClear() {
  let cachesNames = await caches.keys();
  let oldCachesNames = cachesNames.filter(function matchOldCache(cacheName) {
    if (/^redux-app-cache-\d+$/.test(cacheName)) {
      let [, cacheVersion] = cacheName.match(/^redux-app-cache-(\d)$/);

      cacheVersion = cacheVersion != null ? Number(cacheVersion) : cacheVersion;

      return cacheVersion > 0 && cacheVersion !== version;
    }

    return false;
  });

  return Promise.all(
    oldCachesNames.map(function deleteCache(cacheName) {
      return caches.delete(cacheName);
    })
  );
}

async function cacheFiles(forceLoad) {
  let cache = await caches.open(cacheName);

  return Promise.all(
    urlsToCache.map(async function requestFile({ url }) {
      try {
        let res;

        if (!forceLoad) {
          res = await cache.match(url);

          if (res) {
            return res;
          }
        }

        let fetchOptions = {
          method: "GET",
          cache: "no-cache",
          credentials: "omit",
        };

        res = await fetch(url, fetchOptions);

        if (res.ok) {
          await cache.put(url, res);
        }
      } catch (e) {}
    })
  );
}
