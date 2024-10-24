import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Widgets from "./components/Widgets";
import useDarkMode from "./hooks/useDarkMode";

const queryClient = new QueryClient();

export default function App() {
  const isDarkMode = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <RootContainer style={{ backgroundColor: isDarkMode ? "#000" : "#fff" }}>
        <Widgets />
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
