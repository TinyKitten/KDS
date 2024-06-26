import styled from "styled-components/native";
import useAnalect from "../../hooks/useAnalect";
import { textMixin } from "../../utils/textMixin";

const AnalectWidget = () => {
  const analect = useAnalect();

  if (!analect) {
    return null;
  }

  return (
    <>
      <AnalectText numberOfLines={2} adjustsFontSizeToFit>
        “{analect.text}”
      </AnalectText>
      <AnalectAuthor>
        <Dash />
        <AnalectAuthorName>&nbsp;{analect.author}</AnalectAuthorName>
      </AnalectAuthor>
    </>
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
const DashText = styled.Text<{ first?: boolean }>`
  margin-left: ${({ first }) => (first ? "0px" : "-3px")};
`;

export const AnalectWidgetContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  padding-right: 150px;
`;

export default AnalectWidget;

const AnalectText = styled.Text`
  ${textMixin}
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
`;
const AnalectAuthor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const AnalectAuthorName = styled.Text`
  ${textMixin}
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;
