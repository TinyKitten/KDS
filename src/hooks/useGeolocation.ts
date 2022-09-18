import { useQuery } from "@tanstack/react-query";
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
} => {
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
      setWifiAccessPoints(await getNearbyAccessPoints());
    })();
  }, []);

  return {
    error,
    isLoading,
    coords: data && {
      latitude: data.location.lat,
      longitude: data.location.lng,
    },
  };
};

export default useGeolocation;
