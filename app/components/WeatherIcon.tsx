import Cloudy from "./icons/Cloudy";
import Drizzle from "../components/icons/Drizzle";
import Foggy from "./icons/Foggy";
import Rainy from "./icons/Rainy";
import Snow from "./icons/Snow";
import Sunny from "./icons/Sunny";
import Thunderstorm from "./icons/Thunderstorm";

type Props = {
  weatherCode: number;
};

export const WeatherIcon = ({ weatherCode }: Props) => {
  // https://open-meteo.com/en/docs
  switch (weatherCode) {
    case 0:
    case 1:
      return <Sunny />;
    case 2:
    case 3:
      return <Cloudy />;
    case 45:
    case 48:
      return <Foggy />;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return <Drizzle />;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return <Rainy />;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return <Snow />;
    case 95:
    case 96:
    case 99:
      return <Thunderstorm />;
    default:
      return null;
  }
};
