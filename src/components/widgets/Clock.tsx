import React from "react";
import styled from "styled-components/native";
import useClock from "../../hooks/useClock";
import { textMixin } from "../../utils/textMixin";

const ClockWidget = () => {
  const { date, time } = useClock();

  return (
    <Container>
      <DateText>{date}</DateText>
      <TimeText>{time}</TimeText>
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

const DateText = styled.Text`
  ${textMixin}
  font-weight: 500;
  font-size: 24px;
`;

const TimeText = styled.Text`
  ${textMixin}
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
`;
