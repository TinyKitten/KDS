import { useKeepAwake } from "expo-keep-awake";
import { Dimensions } from "react-native";
import { isTablet } from "react-native-device-info";
import styled from "styled-components/native";
import AnalectWidget from "../components/widgets/Analect";
import ClockWidget, { ClockWidgetContainer } from "../components/widgets/Clock";
import MemoWidget, { MemoWidgetContainer } from "../components/widgets/Memo";
import WeatherWidget, {
  WeatherWidgetContainer,
} from "../components/widgets/Weather";
import useBulletinBoard from "../hooks/useBulletinBoard";
import useDarkMode from "../hooks/useDarkMode";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function Widgets() {
  useKeepAwake();
  const { latestPost } = useBulletinBoard();
  const isDarkMode = useDarkMode();

  return (
    <WidgetsContainer>
      <TopWidgetContainer>
        <ClockWidgetContainer>
          <ClockWidget />
        </ClockWidgetContainer>
        <WeatherWidgetContainer>
          <WeatherWidget />
        </WeatherWidgetContainer>
      </TopWidgetContainer>

      <MemoWidgetContainer>
        <MemoWidget latestPost={latestPost} />
      </MemoWidgetContainer>

      {isTablet() ? (
        <BottomWidgetContainer>
          <AnalectWidget />
        </BottomWidgetContainer>
      ) : null}

      {/* {latestPost?.qr_text ? (
        <QRCodeContainer>
          <QRCode
            size={64}
            backgroundColor="transparent"
            color={isDarkMode ? "#fff" : "#000"}
            value={latestPost.qr_text}
          />
        </QRCodeContainer>
      ) : null} */}
    </WidgetsContainer>
  );
}

const WidgetsContainer = styled.View`
  width: ${windowWidth - (isTablet() ? 96 : 64)}px;
  height: ${windowHeight - (isTablet() ? 96 : 64)}px;
`;

const TopWidgetContainer = styled.View`
  display: flex;
  height: 96px;
  overflow: hidden;
  flex-shrink: 0;
  flex-direction: row;
`;

const BottomWidgetContainer = styled.View`
  height: 72px;
`;
