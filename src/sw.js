/* let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
}); */
self.addEventListener("installed", (event) => {
  console.log("installed");
});

self.addEventListener("activated", () => {
  console.log("activated SW");
});

console.log("service worker"); 