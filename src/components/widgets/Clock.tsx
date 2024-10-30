import React from "react";
import styled from "styled-components/native";
import useClock from "../../hooks/useClock";
import { TypographyBase } from "../TypographyBase";

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

export const ClockWidgetContainer = styled.View``;

const Container = styled.View`
  height: 72px;
`;

const DateText = styled(TypographyBase)`
  font-weight: 500;
  font-size: 24px;
`;

const TimeText = styled(TypographyBase)`
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
`;
