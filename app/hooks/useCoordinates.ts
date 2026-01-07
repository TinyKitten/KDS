import { useEffect, useState } from "react";

const fallbackLat = Number.parseFloat(
  process.env.NEXT_PUBLIC_FALLBACK_LATITUDE ?? ""
);
const fallbackLon = Number.parseFloat(
  process.env.NEXT_PUBLIC_FALLBACK_LONGITUDE ?? ""
);

const FALLBACK_COORDINATES = {
  latitude: fallbackLat,
  longitude: fallbackLon,
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
        setCoordinates({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.error("Error obtaining coordinates:", error);
      }
    );
  }, []);

  return coordinates ?? FALLBACK_COORDINATES;
};
