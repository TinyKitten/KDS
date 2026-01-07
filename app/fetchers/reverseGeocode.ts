import { ReverseGeocode } from "../domain/geo";

export const reverseGeocodeFetcher = async (
  latitude: number | undefined,
  longitude: number | undefined
): Promise<ReverseGeocode> => {
  if (latitude === undefined || longitude === undefined) {
    throw new Error("Latitude and Longitude must be defined");
  }

  const response = await fetch(`/api/rg?lat=${latitude}&lon=${longitude}`);

  if (!response.ok) {
    throw new Error("Failed to fetch reverse geocoding data");
  }

  const data: ReverseGeocode = await response.json();
  return data;
};
