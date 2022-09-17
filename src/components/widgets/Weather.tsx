import { PLACED_CITY_NAME, PLACED_LATITUDE, PLACED_LONGITUDE } from "@env";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components/native";
import { fetchOneCallAPI } from "../../api/owm";
import { OWMOneCallAPIData } from "../../models/OWM";
import getRotation from "../../utils/rotation";
import { textMixin } from "../../utils/textMixin";
import getWeatherIcon from "../../utils/weatherIcon";
import HighestChevron from "../icons/HighestChevron";
import LowestTempChevron from "../icons/LowestChevron";
import Umbrella from "../icons/Umbrella";
import Wind from "../icons/Wind";

const WeatherWidget = () => {
  const {
    error: weatherError,
    data: weatherData,
    isLoading: weatherLoading,
  } = useQuery<OWMOneCallAPIData>(
    ["oneCallAPI", PLACED_LATITUDE, PLACED_LONGITUDE],
    fetchOneCallAPI,
    {
      refetchInterval: 1000 * 60 * 30, // 30min
    }
  );

  if (!!weatherError) {
    console.error(weatherError);
    return null;
  }

  if (weatherLoading) {
    return null;
  }

  const windRotation = getRotation(weatherData?.current.wind_deg);
  const weatherIcon = getWeatherIcon(weatherData?.current.weather[0]?.id);

  return (
    <Container>
      <PlaceName>{PLACED_CITY_NAME}</PlaceName>
      <ConditionContainer>
        {weatherIcon}
        <ValuesContainer>
          <CurrentTemperature>
            {Math.round(weatherData?.current.temp ?? 0)}°
          </CurrentTemperature>
          <RowContainer>
            <UpItemContainer>
              <LowestTempChevron />
              <ValueText>
                {Math.round(weatherData?.daily[0].temp.min ?? 0)}°
              </ValueText>
            </UpItemContainer>
            <UpItemContainer>
              <HighestChevron />
              <ValueText>
                {Math.round(weatherData?.daily[0].temp.max ?? 0)}°
              </ValueText>
            </UpItemContainer>
          </RowContainer>
          <RowContainer>
            <DownItemContainer>
              <Wind />
              <ValueText>
                {Math.round(weatherData?.current?.wind_speed ?? 0)}
              </ValueText>
              <ValueUnitText>{windRotation}</ValueUnitText>
            </DownItemContainer>
            <DownItemContainer>
              <Umbrella />
              <ValueText>
                {Math.round(weatherData?.current?.rain?.["1h"] ?? 0)}%
              </ValueText>
            </DownItemContainer>
          </RowContainer>
        </ValuesContainer>
      </ConditionContainer>
    </Container>
  );
};

const Container = styled.View``;

const PlaceName = styled.Text`
  ${textMixin}
  font-size: 20px;
  font-weight: 700;
  line-height: 24.42px;
  margin-bottom: 10px;
`;

const ConditionContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const ValuesContainer = styled.View`
  flex-direction: column;
  margin-left: 20px;
`;

const CurrentTemperature = styled.Text`
  ${textMixin}
  font-size: 64px;
  line-height: 78.14px;
  font-weight: 500;
`;

const RowContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const UpItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const DownItemContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const ValueText = styled.Text`
  ${textMixin}
  font-size: 16px;
  line-height: 19.54px;
  margin-left: 2px;
`;

const ValueUnitText = styled.Text`
  ${textMixin}
  font-size: 8px;
  line-height: ${19.54 / 2}px;
`;

export const WeatherWidgetContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;

export default WeatherWidget;
