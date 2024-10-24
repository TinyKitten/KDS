import { useMemo } from "react";
import { isTablet } from "react-native-device-info";
import styled from "styled-components/native";
import { useCurrentPosition } from "../../hooks/useCurrentPosition";
import useDarkMode from "../../hooks/useDarkMode";
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding";
import { useWeather } from "../../hooks/useWeather";
import getRotation from "../../utils/rotation";
import HighestChevron from "../icons/HighestChevron";
import LowestTempChevron from "../icons/LowestChevron";
import Wind from "../icons/Wind";
import { TypographyBase } from "../TypographyBase";
import { WeatherIcon } from "../WeatherIcon";

const WeatherWidget = () => {
  const { coords, granted: locationPermissionGranted } = useCurrentPosition();
  const { data: weather } = useWeather(coords?.latitude, coords?.longitude);
  const isDarkMode = useDarkMode();

  const fill = isDarkMode ? "#fff" : "#000";

  const {
    error: reverseGeocodingError,
    isLoading: reverseGeocodingLoading,
    data: reverseGeocodingRes,
  } = useReverseGeocoding(coords?.latitude, coords?.longitude);

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

  return (
    <Container>
      <PlaceName>{placeName}</PlaceName>
      <ConditionContainer>
        <CurrentContainer>
          <WeatherIconContainer>
            <WeatherIcon weatherCode={weather.weatherCode} />
          </WeatherIconContainer>
          <CurrentTemperature>
            {Math.round(weather.temperature)}°
          </CurrentTemperature>
        </CurrentContainer>
        <ValuesContainer>
          <RowContainer>
            <ValueContainer>
              <LowestTempChevron fill={fill} />
              <ValueText>{Math.round(weather.temperatureMin[0])}°</ValueText>
            </ValueContainer>
            <ValueContainer>
              <HighestChevron fill={fill} />
              <ValueText>
                {Math.round(weather.temperatureMax[0] ?? 0)}°
              </ValueText>
            </ValueContainer>
          </RowContainer>
          <RowContainer>
            <ValueContainer>
              <Wind fill={fill} />
              <ValueText>{Math.round(weather.windSpeed ?? 0)}</ValueText>
            </ValueContainer>
            <ValueContainer column>
              <TinyText>{windRotation}</TinyText>
              <TinyText>km/h</TinyText>
            </ValueContainer>
          </RowContainer>
        </ValuesContainer>
      </ConditionContainer>
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
  align-self: flex-end;
`;

const PlaceName = styled(TypographyBase)`
  font-size: ${isTablet() ? 24 : 16}px;
  line-height: ${isTablet() ? 24 : 16}px;
  font-weight: 700;
  text-align: right;
`;

const ConditionContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${isTablet() ? 8 : 4}px;
`;

const WeatherIconContainer = styled.View`
  width: 100%;
  height: 100%;
  max-width: 48px;
  max-height: 48px;
`;

const CurrentTemperature = styled(TypographyBase)`
  font-size: 48px;
  font-weight: 600;
`;

const ValuesContainer = styled.View`
  gap: ${isTablet() ? 0 : 4}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const CurrentContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ValueContainer = styled.View<{ column?: boolean }>`
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ column }) => (column ? "flex-start" : "center")};
`;

const ValueText = styled(TypographyBase)`
  font-size: 16px;
  line-height: 16px;
  margin-left: 4px;
`;

const TinyText = styled(TypographyBase)`
  font-size: 8px;
  line-height: 8px;
  margin-left: 2px;
`;

export const WeatherWidgetContainer = styled.View`
  flex: 1;
`;

export default WeatherWidget;
