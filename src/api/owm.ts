import { OWM_API_KEY, PLACED_LATITUDE, PLACED_LONGITUDE } from "@env";

export const fetchOneCallAPI = async () => {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${PLACED_LATITUDE}&lon=${PLACED_LONGITUDE}&appid=${OWM_API_KEY}&units=metric`
  );
  return res.json();
};
