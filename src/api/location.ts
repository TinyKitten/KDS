import { GOOGLE_CLOUD_API_KEY } from "@env";

export const reverseGeocodeFetcher = async (
	latitude: number,
	longitude: number,
) => {
	const res = await fetch(
		`https://maps.google.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&language=en&key=${GOOGLE_CLOUD_API_KEY}`,
	);
	return res.json();
};
