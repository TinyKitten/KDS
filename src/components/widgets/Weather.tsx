import { useMemo } from "react";
import styled from "styled-components/native";
import { useCurrentPosition } from "../../hooks/useCurrentPosition";
import useDarkMode from "../../hooks/useDarkMode";
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding";
import { useWeather } from "../../hooks/useWeather";
import getRotation from "../../utils/rotation";
import { TypographyBase } from "../TypographyBase";
import { WeatherIcon } from "../WeatherIcon";
import HighestChevron from "../icons/HighestChevron";
import LowestTempChevron from "../icons/LowestChevron";
import Wind from "../icons/Wind";

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
				c.types.findIndex((t) => t === "administrative_area_level_1") !== -1,
		);
		const city = addrComps.find(
			(c) => c.types.findIndex((t) => t === "locality") !== -1,
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
					<TemperatureContainer>
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
					</TemperatureContainer>
					<WindContainer>
						<ValueContainer>
							<Wind fill={fill} />
							<ValueText>{Math.round(weather.windSpeed ?? 0)}</ValueText>
						</ValueContainer>
						<ValueContainer column>
							<TinyText>{windRotation}</TinyText>
							<TinyText>m/s</TinyText>
						</ValueContainer>
					</WindContainer>
				</ValuesContainer>
			</ConditionContainer>
		</Container>
	);
};

const Container = styled.View`
  align-self: flex-end;
  height: 96px;
`;

const PlaceName = styled(TypographyBase)`
  font-size: 16px;
  font-weight: 600;
  text-align: right;
`;

const ConditionContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const WeatherIconContainer = styled.View`
  width: 48px;
  height: 48px;
`;

const CurrentTemperature = styled(TypographyBase)`
  font-size: 48px;
  font-weight: 600;
`;

const ValuesContainer = styled.View``;

const TemperatureContainer = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const WindContainer = styled.View`
  flex-direction: row;
`;

const CurrentContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ValueContainer = styled.View<{ column?: boolean }>`
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ column }) => (column ? "flex-start" : "center")};
  justify-content: center;
`;

const ValueText = styled(TypographyBase)`
  font-size: 16px;
  margin-left: 4px;
`;

const TinyText = styled(TypographyBase)`
  font-size: 8px;
  margin-left: 2px;
  line-height: 8px;
`;

export const WeatherWidgetContainer = styled.View``;

export default WeatherWidget;
