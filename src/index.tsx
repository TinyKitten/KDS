import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
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
  background-color: #fff;
  padding: 50px;
`;
