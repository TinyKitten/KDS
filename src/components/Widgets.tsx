import { useKeepAwake } from "expo-keep-awake";
import { isTablet } from "react-native-device-info";
import QRCode from "react-native-qrcode-svg";
import styled from "styled-components/native";
import AnalectWidget from "../components/widgets/Analect";
import ClockWidget, { ClockWidgetContainer } from "../components/widgets/Clock";
import Credit, { CreditWidgetContainer } from "../components/widgets/Credit";
import MemoWidget, { MemoWidgetContainer } from "../components/widgets/Memo";
import WeatherWidget, {
  WeatherWidgetContainer,
} from "../components/widgets/Weather";
import useBulletinBoard from "../hooks/useBulletinBoard";
import useDarkMode from "../hooks/useDarkMode";

const isSP = !isTablet();

export default function Widgets() {
  useKeepAwake();
  const { latestPost } = useBulletinBoard();
  const isDarkMode = useDarkMode();

  return (
    <WidgetsContainer>
      <ClockWidgetContainer>
        <ClockWidget />
      </ClockWidgetContainer>
      <CreditWidgetContainer>
        {latestPost?.qr_text ? (
          <QRCodeContainer>
            <QRCode
              size={isSP ? 48 : 72}
              backgroundColor={isDarkMode ? "#000" : "#fff"}
              color={isDarkMode ? "#fff" : "#000"}
              value={latestPost.qr_text}
            />
          </QRCodeContainer>
        ) : null}

        <Credit />
      </CreditWidgetContainer>
      {!isSP ? (
        <BottomWidgetContainer>
          <AnalectWidget />
        </BottomWidgetContainer>
      ) : null}
      <WeatherWidgetContainer>
        <WeatherWidget />
      </WeatherWidgetContainer>
      <MemoWidgetContainer>
        <MemoWidget latestPost={latestPost} />
      </MemoWidgetContainer>
    </WidgetsContainer>
  );
}

const WidgetsContainer = styled.View`
  position: relative;
  flex: 1;
`;

const BottomWidgetContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  padding-right: 150px;
`;

const QRCodeContainer = styled.View`
  flex-direction: column;
  align-items: center;
  top: ${isSP ? "16px" : 0};
`;
