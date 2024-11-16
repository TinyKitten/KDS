import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import styled from "styled-components/native";
import Widgets from "./components/Widgets";
import useDarkMode from "./hooks/useDarkMode";
import useSubscribeNotify from "./hooks/useNotify";

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
