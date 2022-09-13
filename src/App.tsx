import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import WeatherWidget, { WeatherWidgetContainer } from "./components/Weather";
import AnalectWidget, {
  AnalectWidgetContainer,
} from "./components/widgets/Analect";
import ClockWidget, { ClockWidgetContainer } from "./components/widgets/Clock";
import Credit, { CreditWidgetContainer } from "./components/widgets/Credit";

const queryClient = new QueryClient();

export default function App() {
  useKeepAwake();

  return (
    <QueryClientProvider client={queryClient}>
      <RootContainer>
        <WidgetsContainer>
          <ClockWidgetContainer>
            <ClockWidget />
          </ClockWidgetContainer>
          <CreditWidgetContainer>
            <Credit />
          </CreditWidgetContainer>
          <AnalectWidgetContainer>
            <AnalectWidget />
          </AnalectWidgetContainer>
          <WeatherWidgetContainer>
            <WeatherWidget />
          </WeatherWidgetContainer>
        </WidgetsContainer>
        <StatusBar hidden />
      </RootContainer>
    </QueryClientProvider>
  );
}

const RootContainer = styled.View`
  flex: 1;
  background-color: #212121;
  padding: 50px;
`;

const WidgetsContainer = styled.View`
  position: relative;
  flex: 1;
`;
