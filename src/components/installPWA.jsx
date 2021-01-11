import React, { useState, useEffect, useLayoutEffect } from "react";

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};
// Detects if device is in standalone mode
const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;

let deferredPrompt;

function onGlobalClick() {
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();
}

function onBeforeInstallPrompt(event) {
  event.preventDefault();

  deferredPrompt = event;

  // document.addEventListener("click", onGlobalClick);
}

//document.addEventListener("click", onGlobalClick);
function InstallPWA() {
  const [isIos, setIsIos] = useState(false);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) {
      setIsIos(true);
      setIsShow(true);
    } else {
      window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          onBeforeInstallPrompt
        );
      };
    }

    return () => {};
  }, []);

  function onInstall() {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((result) => {
      if (result.outcome === "dismissed") {
        console.log("App wasn't installed");
      } else {
        console.log("App was installed");
      }
      setIsShow(false);
    });
  }

  return (
    <>{isIos ? <div>ios</div> : <button onClick={onInstall}>Install</button>}</>
  );
}

export default InstallPWA;
