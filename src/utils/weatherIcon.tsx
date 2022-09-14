import Cloudy from "../components/icons/Cloudy";
import Drizzle from "../components/icons/Drizzle";
import Foggy from "../components/icons/Foggy";
import Rainy from "../components/icons/Rainy";
import Snow from "../components/icons/Snow";
import Sunny from "../components/icons/Sunny";
import Thunderstorm from "../components/icons/Thunderstorm";

const getWeatherIcon = (id: number | undefined) => {
  if (!id) {
    return null;
  }
  if (id === 800) {
    return <Sunny />;
  }
  if (id > 800) {
    return <Cloudy />;
  }
  if (id > 700) {
    return <Foggy />;
  }
  if (id > 600) {
    return <Snow />;
  }
  if (id > 500) {
    return <Rainy />;
  }
  if (id > 300) {
    return <Drizzle />;
  }
  if (id > 200) {
    return <Thunderstorm />;
  }
  return null;
};

export default getWeatherIcon;
