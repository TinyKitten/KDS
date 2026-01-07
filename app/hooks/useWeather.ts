import { WeatherData } from "../domain/weather";
import { weatherFetcher } from "../fetchers/weather";
import { useEffect } from "react";
import useSWR from "swr";

export const useWeather = (
  latitude: number | undefined,
  longitude: number | undefined
) => {
  const { data, error, isLoading, mutate } = useSWR<WeatherData>(
    ["weather", latitude, longitude],
    () => weatherFetcher(latitude, longitude)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 10 * 60 * 1000); // 10分おきに更新

    return () => clearInterval(interval);
  }, [mutate]);

  return { data, error, isLoading };
};
