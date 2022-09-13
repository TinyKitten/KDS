import { PLACED_LATITUDE, PLACED_LONGITUDE } from "@env";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components/native";
import { fetchCurrentWeather } from "../api/owm";
import getRotation from "../utils/rotation";
import { textMixin } from "../utils/textMixin";
import getWeatherIcon from "../utils/weatherIcon";
import HighestChevron from "./icons/HighestChevron";
import LowestTempChevron from "./icons/LowestChevron";
import Wind from "./icons/Wind";

const WeatherWidget = () => {
  const query = useQuery<OpenWeatherMapData>(
    ["owm", PLACED_LATITUDE, PLACED_LONGITUDE],
    fetchCurrentWeather,
    {
      refetchInterval: 1000 * 60 * 60, // 1h
    }
  );

  if (query.error) {
    console.error(query.error);
    return null;
  }

  if (!query.data) {
    return null;
  }

  const windRotation = getRotation(query.data.wind.deg);
  const weatherIcon = getWeatherIcon(query.data.weather[0]?.id);

  return (
    <Container>
      <PlaceName>
        {query.data.name}, {query.data.sys.country}
      </PlaceName>
      <ConditionContainer>
        {weatherIcon}
        <ValuesContainer>
          <CurrentTemperature>
            {Math.round(query.data.main.temp)}°
          </CurrentTemperature>
          <RowContainer>
            <MinMaxItemContainer>
              <LowestTempChevron />
              <ValueText>{Math.round(query.data.main.temp_min)}°</ValueText>
            </MinMaxItemContainer>
            <MinMaxSpacer />
            <MinMaxItemContainer>
              <HighestChevron />
              <ValueText>{Math.round(query.data.main.temp_max)}°</ValueText>
            </MinMaxItemContainer>
          </RowContainer>
          <RowContainer>
            <Wind />
            <ValueAndUnitTextContainer>
              <ValueText>{Math.round(query.data.wind.speed)}</ValueText>
              <ValueUnitText>{windRotation}</ValueUnitText>
            </ValueAndUnitTextContainer>
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
`;

const MinMaxItemContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ValueText = styled.Text`
  ${textMixin}
  font-size: 16px;
  line-height: 19.54px;
  margin-left: 2px;
`;

const MinMaxSpacer = styled.View`
  width: 11px;
`;

const ValueUnitText = styled.Text`
  ${textMixin}
  font-size: 8px;
  line-height: ${19.54 / 2}px;
`;

const ValueAndUnitTextContainer = styled.View`
  flex-direction: row;
`;

export const WeatherWidgetContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;

export default WeatherWidget;
