import { OWM_API_KEY } from "@env";

export const fetchOneCallAPI = async (
  latitude: number | undefined,
  longitude: number | undefined
) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${OWM_API_KEY}&units=metric`
  );
  return res.json();
};
