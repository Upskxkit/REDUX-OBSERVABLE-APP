let svworker;

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;

      registerValidSW(swUrl, config);
    });
  }
}

async function registerValidSW(swUrl, config) {
  const swReg = await navigator.serviceWorker.register(swUrl, config);

  svworker = swReg.installing || swReg.waiting || swReg.active;

  navigator.serviceWorker.addEventListener(
    "controllerchange",
    function onController() {
      svworker = navigator.serviceWorker.controller;
      // sendStatusUpdate(svworker);
    }
  );

  navigator.serviceWorker.addEventListener("message", onSWMessage);
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}

function onSWMessage(event) {
  let { date } = event;

  if (date.requestStatusUpdate) {
    console.log("Recice status update request from service worker");
    // sendStatusUpdate(event.ports && event.ports[0]);
  }
}

/* function sendStatusUpdate(target) {
  sendSWMessage({ statusUpdate: { isLocalhost } }, target);
} */
