import { useQuery } from "@tanstack/react-query";
import { fetchReverseGeocodeAPI } from "../api/location";
import { ReverseGeocode } from "../models/RevserseGeocode";

const useReverseGeocode = (
  latitude: number | undefined,
  longitude: number | undefined
): {
  error: unknown;
  isLoading: boolean;
  data: ReverseGeocode | undefined;
} => {
  const { error, data, isLoading } = useQuery<ReverseGeocode>(
    ["reverseGeocode", latitude, longitude],
    () => fetchReverseGeocodeAPI(latitude ?? 0, longitude ?? 0),
    { enabled: !!latitude && !!longitude }
  );

  return {
    error,
    isLoading,
    data,
  };
};

export default useReverseGeocode;
