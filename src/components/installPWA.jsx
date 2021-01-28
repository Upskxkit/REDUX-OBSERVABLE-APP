import React, { useState, useEffect } from "react";
import { IosModal } from "./iosModal";
import { isIos, isInStandaloneMode } from "./helpres";
import { unregister } from "../registerSW";

let deferredPrompt;

function onBeforeInstallPrompt(event) {
  event.preventDefault();

  deferredPrompt = event;
}

function InstallPWA() {
  const [isIosDevice, setIsIosDevice] = useState(false);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) {
      setIsIosDevice(true);
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
    });
  }

  if (isInStandaloneMode()) {
    return <></>;
  }

  return (
    <>
      <div>
        {JSON.stringify(window.navigator.userAgent.toLowerCase())}
        <hr />
        {JSON.stringify(window.navigator.standalone)}
      </div>
      {isIosDevice ? (
        <IosModal />
      ) : (
        <>
          <button onClick={onInstall}>Install</button>
          <button onClick={unregister}>Unregister SW</button>
        </>
      )}
    </>
  );
}

export default InstallPWA;
