import styled from "styled-components/native";
import useBulletinBoard from "../../hooks/useBulletinBoard";
import { textMixin } from "../../utils/textMixin";

const MemoWidget = () => {
  const [post] = useBulletinBoard();

  if (!post) {
    return null;
  }

  return (
    <Container>
      <FirstPostTitle numberOfLines={2}>{post.heading}</FirstPostTitle>
      <FirstPostBody numberOfLines={10}>{post.text}</FirstPostBody>
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
