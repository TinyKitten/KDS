import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import AnalectWidget, {
  AnalectWidgetContainer,
} from "./components/widgets/Analect";
import ClockWidget, { ClockWidgetContainer } from "./components/widgets/Clock";
import Credit, { CreditWidgetContainer } from "./components/widgets/Credit";
import MemoWidget, { MemoWidgetContainer } from "./components/widgets/Memo";
import WeatherWidget, {
  WeatherWidgetContainer,
} from "./components/widgets/Weather";

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
          <MemoWidgetContainer>
            <MemoWidget />
          </MemoWidgetContainer>
        </WidgetsContainer>
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

const WidgetsContainer = styled.View`
  position: relative;
  flex: 1;
`;
