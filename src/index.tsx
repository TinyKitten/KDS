import {
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_900Black,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import styled from "styled-components/native";
import Widgets from "./components/Widgets";
import useDarkMode from "./hooks/useDarkMode";
import useSubscribeNotify from "./hooks/useNotify";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function App() {
	const isDarkMode = useDarkMode();
	const { uncheckedNotify, confirm: confirmNotify } = useSubscribeNotify();

	const backgroundColor = useMemo(() => {
		if (uncheckedNotify?.urgent) {
			return "red";
		}
		return isDarkMode ? "#000" : "#fff";
	}, [isDarkMode, uncheckedNotify]);

	const [loaded, error] = useFonts({
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_900Black,
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<RootContainer style={{ backgroundColor }}>
				<Widgets
					uncheckedNotify={uncheckedNotify}
					confirmNotify={confirmNotify}
				/>
				<StatusBar hidden />
			</RootContainer>
		</QueryClientProvider>
	);
}

const RootContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
