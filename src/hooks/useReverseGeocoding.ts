import { useQuery } from "@tanstack/react-query";
import { reverseGeocodeFetcher } from "../api/location";
import { ReverseGeocode } from "../models/RevserseGeocode";

export const useReverseGeocoding = (
	latitude: number | undefined,
	longitude: number | undefined,
): {
	error: unknown;
	isLoading: boolean;
	data: ReverseGeocode | undefined;
} => {
	const { error, data, isLoading } = useQuery<ReverseGeocode>(
		["reverseGeocode", latitude, longitude],
		() => reverseGeocodeFetcher(latitude ?? 0, longitude ?? 0),
		{ enabled: !!latitude && !!longitude },
	);

	return {
		error,
		isLoading,
		data,
	};
};
