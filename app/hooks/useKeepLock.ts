import { useEffect } from "react";

export const useKeepWakeLock = () => {
  useEffect(() => {
    const keepAwake = async () => {
      if ("wakeLock" in navigator) {
        try {
          await navigator.wakeLock.request("screen");
          console.log("Wake Lock is active");
        } catch (error) {
          console.error("Failed to acquire Wake Lock:", error);
        }
      }
    };

    keepAwake();
  }, []);
};
