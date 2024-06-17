import { useMemo } from "react";
import styled from "styled-components/native";
import useGeolocation from "../../hooks/useGeolocation";
import useReverseGeocode from "../../hooks/useReverseGeocoding";
import { useWeather } from "../../hooks/useWeather";
import getRotation from "../../utils/rotation";
import { textMixin } from "../../utils/textMixin";
import { getWeatherIcon } from "../../utils/weatherIcon";
import HighestChevron from "../icons/HighestChevron";
import LowestTempChevron from "../icons/LowestChevron";
import Wind from "../icons/Wind";

const WeatherWidget = () => {
  const { coords, granted: locationPermissionGranted } = useGeolocation();
  const weather = useWeather(coords?.latitude, coords?.longitude);

  const {
    error: reverseGeocodingError,
    isLoading: reverseGeocodingLoading,
    data: reverseGeocodingRes,
  } = useReverseGeocode(coords?.latitude, coords?.longitude);

  const placeName = useMemo(() => {
    if (reverseGeocodingLoading) {
      return "Loading...";
    }
    if (reverseGeocodingError) {
      return "";
    }
    const results = reverseGeocodingRes?.results ?? [];
    const addrComps = results[0]?.address_components ?? [];
    if (!results.length) {
      return "Unknown";
    }

    const pref = addrComps.find(
      (c) =>
        c.types.findIndex((t) => t === "administrative_area_level_1") !== -1
    );
    const city = addrComps.find(
      (c) => c.types.findIndex((t) => t === "locality") !== -1
    );

    return `${city?.short_name}, ${pref?.short_name}`;
  }, [reverseGeocodingLoading, reverseGeocodingError, reverseGeocodingRes]);

  if (!weather) {
    return (
      <Container>
        <PlaceName>Loading...</PlaceName>
      </Container>
    );
  }

  if (!locationPermissionGranted) {
    return (
      <Container>
        <PlaceName>Location permission has not been granted.</PlaceName>
      </Container>
    );
  }

  const windRotation = getRotation(weather.windDirection);
  const weatherIcon = getWeatherIcon(weather.weatherCode);

  return (
    <Container>
      <PlaceName>{placeName}</PlaceName>
      <ConditionContainer>
        {weatherIcon}
        <ValuesContainer>
          <CurrentTemperature>
            {Math.round(weather.temperature)}°
          </CurrentTemperature>
          <RowContainer>
            <UpItemContainer>
              <LowestTempChevron />
              <ValueText>{Math.round(weather.temperatureMin[0])}°</ValueText>
            </UpItemContainer>
            <UpItemContainer>
              <HighestChevron />
              <ValueText>
                {Math.round(weather.temperatureMax[0] ?? 0)}°
              </ValueText>
            </UpItemContainer>
          </RowContainer>
          <RowContainer>
            <DownItemContainer>
              <Wind />
              <ValueText>{Math.round(weather.windSpeed ?? 0)}</ValueText>
              <ValueUnitText>{windRotation}</ValueUnitText>
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
