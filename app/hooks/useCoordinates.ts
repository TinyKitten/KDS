import { useEffect, useState } from "react";

const fallbackLat = process.env.NEXT_PUBLIC_FALLBACK_LATITUDE;
const fallbackLon = process.env.NEXT_PUBLIC_FALLBACK_LONGITUDE;

const FALLBACK_COORDINATES = {
  latitude: Number.parseFloat(fallbackLat ?? ""),
  longitude: Number.parseFloat(fallbackLon ?? ""),
};

export const useCoordinates = (): {
  latitude: number | undefined;
  longitude: number | undefined;
} => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
      },
      (error) => {
        console.error("Error obtaining coordinates:", error);
      }
    );
  }, []);

  return coordinates ?? FALLBACK_COORDINATES;
};
