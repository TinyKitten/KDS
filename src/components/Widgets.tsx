import { useKeepAwake } from "expo-keep-awake";
import { Dimensions } from "react-native";
import { isTablet } from "react-native-device-info";
import QRCode from "react-native-qrcode-svg";
import styled from "styled-components/native";
import ClockWidget, { ClockWidgetContainer } from "../components/widgets/Clock";
import MemoWidget, { MemoWidgetContainer } from "../components/widgets/Memo";
import WeatherWidget, {
  WeatherWidgetContainer,
} from "../components/widgets/Weather";
import useBulletinBoard from "../hooks/useBulletinBoard";
import useDarkMode from "../hooks/useDarkMode";
import Credit, { CreditWidgetContainer } from "./widgets/Credit";

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

      <BottomWidgetContainer>
        {latestPost?.qr_text ? (
          <QRCode
            size={isTablet() ? 64 : 48}
            backgroundColor="transparent"
            color={isDarkMode ? "#fff" : "#000"}
            value={latestPost.qr_text}
          />
        ) : null}
        <CreditWidgetContainer>
          <Credit />
        </CreditWidgetContainer>
      </BottomWidgetContainer>
    </WidgetsContainer>
  );
}

const WidgetsContainer = styled.View`
  width: ${windowWidth - (isTablet() ? 96 : 64)}px;
  height: ${windowHeight - (isTablet() ? 96 : 64)}px;
`;

const TopWidgetContainer = styled.View`
  display: flex;
  overflow: hidden;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const BottomWidgetContainer = styled.View`
  height: ${isTablet() ? 64 : 48}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
