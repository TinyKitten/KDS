import React from "react";
import styled from "styled-components/native";
import useClock from "../../hooks/useClock";
import useDarkMode from "../../hooks/useDarkMode";
import { TypographyBase } from "../TypographyBase";

const ClockWidget = () => {
  const { date, time } = useClock();
  const isDarkMode = useDarkMode();

  return (
    <Container>
      <DateText isDarkMode={isDarkMode}>{date}</DateText>
      <TimeText isDarkMode={isDarkMode}>{time}</TimeText>
    </Container>
  );
};

export default ClockWidget;

export const ClockWidgetContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0;
`;

const Container = styled.View``;

const DateText = styled(TypographyBase)`
  font-weight: 500;
  font-size: 24px;
`;

const TimeText = styled(TypographyBase)`
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
`;
