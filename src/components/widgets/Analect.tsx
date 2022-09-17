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
      <AnalectText>“{analect.text}”</AnalectText>
      <AnalectAuthor>&#x2010;&nbsp;{analect.author}</AnalectAuthor>
    </>
  );
};

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
  line-height: 24px;
`;
const AnalectAuthor = styled.Text`
  ${textMixin}
  font-weight: 600;
  font-size: 16px;
  text-align: right;
  line-height: 24px;
`;
