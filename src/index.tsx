import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";
import styled from "styled-components/native";
import Widgets from "./components/Widgets";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootContainer>
        <Widgets />
        <StatusBar hidden />
      </RootContainer>
    </QueryClientProvider>
  );
}

const RootContainer = styled.View`
  flex: 1;
  background-color: ${Appearance.getColorScheme() === "dark" ? "#000" : "#fff"};
  padding: 50px;
`;
