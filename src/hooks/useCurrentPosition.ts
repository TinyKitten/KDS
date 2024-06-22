import * as Location from "expo-location";
import { LocationObjectCoords } from "expo-location";
import { useEffect, useState } from "react";

export const useCurrentPosition = (): {
  coords: LocationObjectCoords | undefined;
  granted: boolean;
} => {
  const [granted, setGranted] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      setGranted(result.granted);
      if (result.granted) {
        setLocation(await Location.getCurrentPositionAsync());
      }
    })();
  }, []);

  return {
    coords: location?.coords,
    granted,
  };
};
