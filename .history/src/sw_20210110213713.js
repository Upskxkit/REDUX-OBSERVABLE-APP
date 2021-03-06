const version = 1;
const cacheName = `redux-app-cache ${version}`;
const urlsToCache = [{ revision: "", url: "/" }, ...self.__WB_MANIFEST];

self.addEventListener("install", handleInstall);

self.addEventListener("activate", handleActivation);

main().catch(console.error);

//-------------------------------------

async function main() {
  await cacheFiles();
}

console.log("service worker", urlsToCache);

async function handleInstall() {
  self.skipWaiting();
}

function handleActivation(event) {
  event.waitUntil(onActivation);
}

async function onActivation() {
  await clients.claim();
  await cacheFiles(/*forceLoad= */ true);
  console.log(`Service Worker (${version}) activated;`);
}

async function cacheFiles(forceLoad) {
  let cache = await caches.match(cacheName);

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
