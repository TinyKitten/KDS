"use client";
import { Typography } from "../Typography";
import { useCoordinates } from "@/app/hooks/useCoordinates";
import { useWeather } from "@/app/hooks/useWeather";
import { WeatherIcon } from "../WeatherIcon";
import LowestTempChevron from "../icons/LowestTempChevron";
import HighestTempChevron from "../icons/HighestTempChevron";
import Wind from "../icons/Wind";
import { useMemo } from "react";
import { getRotation } from "@/app/utils/rotation";
import { useReverseGeocoding } from "@/app/hooks/useReverseGeocoding";

export const WeatherWidget = () => {
  const coords = useCoordinates();
  const {
    data: weatherData,
    error: fetchWeatherError,
    isLoading: fetchWeatherLoading,
  } = useWeather(coords?.latitude, coords?.longitude);

  const {
    data: geocodedData,
    error: fetchGeocodeError,
    isLoading: fetchGeocodeLoading,
  } = useReverseGeocoding(coords?.latitude, coords?.longitude);

  const windRotation = useMemo(
    () => getRotation(weatherData?.current.wind_direction_10m),
    [weatherData]
  );

  const placeName = useMemo(() => {
    if (fetchGeocodeLoading) {
      return "Loading...";
    }
    if (fetchGeocodeError) {
      return "";
    }
    const results = geocodedData?.results ?? [];
    const addrComps = results[0]?.address_components ?? [];
    if (!results.length) {
      return "Unknown";
    }

    const pref = addrComps.find((c) =>
      c.types.includes("administrative_area_level_1")
    );
    const city = addrComps.find((c) => c.types.includes("locality"));

    return `${city?.short_name}, ${pref?.short_name}`;
  }, [fetchGeocodeLoading, fetchGeocodeError, geocodedData]);

  if (fetchWeatherLoading) {
    return (
      <div className="max-w-1/3 ">
        <Typography className="font-bold">Loading...</Typography>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  if (fetchWeatherError) {
    console.error(fetchWeatherError);
    return (
      <div className="max-w-1/3 ">
        <Typography className="font-bold">
          Error loading weather data
        </Typography>
      </div>
    );
  }

  return (
    <div className="max-w-1/3">
      <Typography className="font-bold text-right mb-1">{placeName}</Typography>
      <div className="flex flex-row items-center justify-center gap-1">
        <div className="flex flex-row items-start justify-center gap-2">
          <div className="w-12 h-12">
            <WeatherIcon weatherCode={weatherData.current.weather_code} />
          </div>
          <div className="text-5xl font-bold">
            {Math.round(weatherData.current.temperature_2m)}°
          </div>
        </div>

        <div>
          <div className="flex flex-row gap-1">
            <div className="flex flex-row items-center justify-center gap-1">
              <LowestTempChevron />
              <Typography className="font-bold">
                {Math.round(weatherData.daily.temperature_2m_min[0])}°
              </Typography>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <HighestTempChevron />
              <Typography className="font-bold">
                {Math.round(weatherData.daily.temperature_2m_max[0])}°
              </Typography>
            </div>
          </div>
          <div className="flex flex-row gap-0.5">
            <div className="flex flex-row items-center justify-center gap-1">
              <Wind />
              <Typography className="font-bold">
                {Math.round(weatherData.current.wind_speed_10m ?? 0)}
              </Typography>
            </div>

            <div className="flex flex-col items-start justify-center gap-1">
              <Typography className="text-[8px] font-bold leading-1">
                {windRotation}
              </Typography>
              <Typography className="text-[8px] font-bold leading-1">
                m/s
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
