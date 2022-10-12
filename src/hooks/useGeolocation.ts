import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { fetchGeolocationAPI } from "../api/location";
import {
  getNearbyAccessPoints,
  NearbyAccessPoint,
} from "../modules/WifiAccessPointsModule";

const useGeolocation = (): {
  error: unknown;
  isLoading: boolean;
  coords: { latitude: number; longitude: number } | undefined;
  granted: boolean;
} => {
  const [granted, setGranted] = useState(false);

  const [wifiAccessPoints, setWifiAccessPoints] = useState<NearbyAccessPoint[]>(
    []
  );
  const { error, data, isLoading } = useQuery<{
    location: {
      lat: number;
      lng: number;
    };
    accuracy: number;
  }>(
    ["geolocation", wifiAccessPoints],
    () => fetchGeolocationAPI(wifiAccessPoints),
    {
      // https://developers.google.com/maps/documentation/geolocation/overview#wifi_access_point_object
      enabled: wifiAccessPoints.length >= 2,
    }
  );

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      setGranted(result.granted);
      if (result.granted) {
        setWifiAccessPoints(await getNearbyAccessPoints());
      }
    })();
  }, []);

  return {
    error,
    isLoading,
    coords: data && {
      latitude: data.location.lat,
      longitude: data.location.lng,
    },
    granted,
  };
};

export default useGeolocation;
