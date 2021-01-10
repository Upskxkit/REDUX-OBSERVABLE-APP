/* eslint-disable no-restricted-globals */

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activated", onActivated);

async function onActivated() {
  console.log(self.__WB_MANIFEST);
}
