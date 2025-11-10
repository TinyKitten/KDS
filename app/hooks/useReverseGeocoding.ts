import useSWR from "swr";
import { ReverseGeocode } from "../domain/geo";
import { reverseGeocodeFetcher } from "../fetchers/reverseGeocode";

export const useReverseGeocoding = (
  latitude: number | undefined,
  longitude: number | undefined
): {
  error: unknown;
  isLoading: boolean;
  data: ReverseGeocode | undefined;
} => {
  const { error, data, isLoading } = useSWR<ReverseGeocode>(
    [latitude, longitude],
    () => reverseGeocodeFetcher(latitude, longitude)
  );

  return {
    error,
    isLoading,
    data,
  };
};
