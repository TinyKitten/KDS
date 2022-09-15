import { useKeepAwake } from "expo-keep-awake";
import styled from "styled-components/native";
import AnalectWidget, {
  AnalectWidgetContainer,
} from "../components/widgets/Analect";
import ClockWidget, { ClockWidgetContainer } from "../components/widgets/Clock";
import Credit, { CreditWidgetContainer } from "../components/widgets/Credit";
import MemoWidget, { MemoWidgetContainer } from "../components/widgets/Memo";
import WeatherWidget, {
  WeatherWidgetContainer,
} from "../components/widgets/Weather";

export default function Widgets() {
  useKeepAwake();

  return (
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
  );
}

const WidgetsContainer = styled.View`
  position: relative;
  flex: 1;
`;
