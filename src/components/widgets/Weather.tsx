import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useEffect, useMemo } from "react";
import styled from "styled-components/native";
import { fetchOneCallAPI } from "../../api/owm";
import useGeolocation from "../../hooks/useGeolocation";
import useReverseGeocode from "../../hooks/useReverseGeocoding";
import { OWMOneCallAPIData } from "../../models/OWM";
import getRotation from "../../utils/rotation";
import { textMixin } from "../../utils/textMixin";
import getWeatherIcon from "../../utils/weatherIcon";
import HighestChevron from "../icons/HighestChevron";
import LowestTempChevron from "../icons/LowestChevron";
import Wind from "../icons/Wind";

const WeatherWidget = () => {
  const {
    error: locationError,
    isLoading: locationLoading,
    coords,
  } = useGeolocation();
  const {
    error: weatherError,
    data: weatherData,
    isLoading: weatherLoading,
  } = useQuery<OWMOneCallAPIData>(
    ["oneCallAPI", coords?.latitude, coords?.longitude],
    () => fetchOneCallAPI(coords?.latitude, coords?.longitude),
    {
      enabled: !locationLoading && !!coords,
      refetchInterval: 1000 * 60 * 30, // 30min
    }
  );
  const {
    error: reverseGeocodingError,
    isLoading: reverseGeocodingLoading,
    data: reverseGeocodingRes,
  } = useReverseGeocode(coords?.latitude, coords?.longitude);

  useEffect(() => {
    async () => {
      if (!coords) {
        return;
      }
      try {
        Location.reverseGeocodeAsync({
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        });
      } catch (err) {
        console.error(err);
      }
    };
  }, []);

  useEffect(() => {
    if (reverseGeocodingError) {
      console.error(reverseGeocodingError);
    }
  }, []);

  const placeName = useMemo(() => {
    if (reverseGeocodingLoading) {
      return "Loading...";
    }
    if (reverseGeocodingError) {
      return "";
    }
    const results = reverseGeocodingRes?.results ?? [];
    const addrComps = results[0].address_components ?? [];
    console.log(addrComps);
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

  if (!!weatherError) {
    return null;
  }

  if (weatherLoading) {
    return null;
  }

  const windRotation = getRotation(weatherData?.current.wind_deg);
  const weatherIcon = getWeatherIcon(weatherData?.current.weather[0]?.id);

  return (
    <Container>
      <PlaceName>{placeName}</PlaceName>
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
