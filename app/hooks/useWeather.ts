import { WeatherData } from "../domain/weather";
import { weatherFetcher } from "../fetchers/weather";
import useSWRImmutable from "swr/immutable";
import { useEffect } from "react";

export const useWeather = (
  latitude: number | null,
  longitude: number | null
) => {
  const { data, error, isLoading, mutate } = useSWRImmutable<WeatherData>(
    [latitude, longitude],
    weatherFetcher
  );

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 10 * 60 * 1000); // 10分おきに更新

    return () => clearInterval(interval);
  }, [mutate]);

  return { data, error, isLoading };
};
