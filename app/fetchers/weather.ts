import { WeatherData } from "../domain/weather";

export const weatherFetcher = async (
  latitude: number | undefined,
  longitude: number | undefined
): Promise<WeatherData> => {
  if (latitude === undefined || longitude === undefined) {
    throw new Error("Latitude and Longitude must be defined");
  }

  const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherData = await response.json();
  return data;
};
