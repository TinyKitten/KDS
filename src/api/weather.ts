import { fetchWeatherApi } from "openmeteo";
import type { WeatherData } from "../models/WeatherData";

export const weatherFetcher = async (
	latitude: number,
	longitude: number,
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
		wind_speed_unit: "ms",
	};

	const responses = await fetchWeatherApi(url, params);

	const response = responses[0];

	const current = response.current();
	const daily = response.daily();

	return {
		temperature: current?.variables(0)?.value() ?? 0,
		relativeHumidity: current?.variables(1)?.value() ?? 0,
		weatherCode: current?.variables(2)?.value() ?? 0,
		windSpeed: current?.variables(3)?.value() ?? 0,
		windDirection: current?.variables(4)?.value() ?? 0,
		temperatureMax: daily?.variables(0)?.valuesArray() ?? new Float32Array(),
		temperatureMin: daily?.variables(1)?.valuesArray() ?? new Float32Array(),
	};
};
