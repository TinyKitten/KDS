import { GOOGLE_CLOUD_API_KEY } from "@env";
import { NearbyAccessPoint } from "../modules/WifiAccessPointsModule";

export const fetchGeolocationAPI = async (
  wifiAccessPoints: NearbyAccessPoint[]
) => {
  const res = await fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_CLOUD_API_KEY}`,
    {
      method: "post",
      body: JSON.stringify({
        wifiAccessPoints,
      }),
    }
  );
  return res.json();
};

export const fetchReverseGeocodeAPI = async (
  latitude: number,
  longitude: number
) => {
  const res = await fetch(
    `https://maps.google.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&language=en&key=${GOOGLE_CLOUD_API_KEY}`
  );
  return res.json();
};
