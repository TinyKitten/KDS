import { fetchWeatherApi } from "openmeteo";
import { WeatherData } from "../models/WeatherData";

export const weatherFetcher = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  const url = "https://api.open-meteo.com/v1/forecast";

  const params = {
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
    ],
    daily: ["temperature_2m_max", "temperature_2m_min"],
    timezone: "Asia/Tokyo",
    forecast_days: 1,
  };

  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const current = response.current()!;
  const daily = response.daily()!;

  return {
    temperature: current.variables(0)!.value(),
    relativeHumidity: current.variables(1)!.value(),
    weatherCode: current.variables(2)!.value(),
    windSpeed: current.variables(3)!.value(),
    windDirection: current.variables(4)!.value(),
    temperatureMax: daily.variables(0)!.valuesArray()!,
    temperatureMin: daily.variables(1)!.valuesArray()!,
  };
};
