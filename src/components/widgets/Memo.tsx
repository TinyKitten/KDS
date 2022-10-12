import { isTablet } from "react-native-device-info";
import styled from "styled-components/native";
import useBulletinBoard from "../../hooks/useBulletinBoard";
import useSpeech from "../../hooks/useSpeech";
import { textMixin } from "../../utils/textMixin";

const MemoWidget = () => {
  const [post] = useBulletinBoard();
  useSpeech();

  if (!post || !isTablet()) {
    return null;
  }

  return (
    <Container>
      <FirstPostTitle numberOfLines={2}>{post.heading}</FirstPostTitle>
      <FirstPostBody numberOfLines={9}>{post.text}</FirstPostBody>
    </Container>
  );
};

export const MemoWidgetContainer = styled.View`
  position: absolute;
  top: 25%;
`;

const Container = styled.View``;

const FirstPostTitle = styled.Text`
  ${textMixin}
  font-size: 32px;
`;
const FirstPostBody = styled.Text`
  ${textMixin}
  font-size: 24px;
`;
export default MemoWidget;
