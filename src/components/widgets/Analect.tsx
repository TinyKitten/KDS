import styled from "styled-components/native";
import useAnalect from "../../hooks/useAnalect";
import { TypographyBase } from "../TypographyBase";

const AnalectWidget = () => {
  const analect = useAnalect();

  if (!analect) {
    return null;
  }

  return (
    <Container>
      <AnalectText>“{analect.text}”</AnalectText>
      <AnalectAuthor>
        <Dash />
        <AnalectAuthorName>&nbsp;{analect.author}</AnalectAuthorName>
      </AnalectAuthor>
    </Container>
  );
};

const Dash = () => (
  <DashContainer>
    <DashText first>&mdash;</DashText>
    <DashText>&mdash;</DashText>
  </DashContainer>
);

const DashContainer = styled.View`
  flex-direction: row;
`;
const DashText = styled(TypographyBase)<{ first?: boolean }>`
  margin-left: ${({ first }) => (first ? "0px" : "-3px")};
`;

export default AnalectWidget;

const Container = styled.View`
  width: 100%;
  justify-content: flex-end;
`;

const AnalectText = styled(TypographyBase)`
  font-weight: 600;
  font-size: 20px;
`;
const AnalectAuthor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const AnalectAuthorName = styled(TypographyBase)`
  font-weight: 600;
  font-size: 16px;
`;

export const AnalectWidgetContainer = styled.View`
  flex: 1;
`;
