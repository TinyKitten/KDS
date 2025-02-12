import { useQuery } from "@tanstack/react-query";
import { weatherFetcher } from "../api/weather";
import type { WeatherData } from "../models/WeatherData";

export const useWeather = (
	latitude: number | undefined,
	longitude: number | undefined,
): {
	error: unknown;
	isLoading: boolean;
	data: WeatherData | undefined;
} => {
	const { error, data, isLoading } = useQuery<WeatherData | undefined>(
		["weather", latitude, longitude],
		() => weatherFetcher(latitude ?? 0, longitude ?? 0),
		{ enabled: !!latitude && !!longitude, refetchInterval: 10 * 60 * 1000 },
	);

	return {
		error,
		isLoading,
		data,
	};
};
