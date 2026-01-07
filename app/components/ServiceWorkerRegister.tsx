"use client";

import { useEffect, useRef } from "react";

export const ServiceWorkerRegister = () => {
  const hasReloadedRef = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (!("serviceWorker" in navigator)) {
      return;
    }

    const handleControllerChange = () => {
      if (hasReloadedRef.current) {
        return;
      }
      hasReloadedRef.current = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange
    );

    let isRegistered = false;

    const register = () => {
      if (isRegistered) {
        return;
      }
      isRegistered = true;

      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          if (registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
          }

          registration.addEventListener("updatefound", () => {
            const installingWorker = registration.installing;
            if (!installingWorker) {
              return;
            }

            installingWorker.addEventListener("statechange", () => {
              if (
                installingWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                installingWorker.postMessage({ type: "SKIP_WAITING" });
              }
            });
          });
        })
        .catch((error) => {
          console.error("Service worker registration failed", error);
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
    }

    return () => {
      window.removeEventListener("load", register);
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange
      );
    };
  }, []);

  return null;
};
