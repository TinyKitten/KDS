import { WeatherData } from "../domain/weather";
import useSWR from "swr";
import { weatherFetcher } from "../fetchers/weather";

export const useWeather = (
  latitude: number | null,
  longitude: number | null
) => {
  const { data, error, isLoading } = useSWR<WeatherData>(
    [latitude, longitude],
    weatherFetcher
  );

  return { data, error, isLoading };
};
