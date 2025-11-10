"use client";

import { useEffect, useRef } from "react";

export const ServiceWorkerRegister = () => {
  const hasPromptedRef = useRef(false);
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

    const promptUserToRefresh = (worker: ServiceWorker) => {
      if (hasPromptedRef.current) {
        return;
      }
      hasPromptedRef.current = true;
      const shouldUpdate = window.confirm(
        "新しいバージョンが利用可能です。更新して最新バージョンを読み込みますか？"
      );
      if (shouldUpdate) {
        worker.postMessage({ type: "SKIP_WAITING" });
      }
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
            promptUserToRefresh(registration.waiting);
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
                promptUserToRefresh(installingWorker);
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
