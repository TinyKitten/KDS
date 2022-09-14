import styled from "styled-components/native";
import useBulletinBoard from "../../hooks/useBulletinBoard";
import { textMixin } from "../../utils/textMixin";

const MemoWidget = () => {
  const posts = useBulletinBoard();

  if (!posts.length) {
    return null;
  }

  return (
    <Container>
      <FirstPostTitle numberOfLines={1}>
        {posts[0].heading.trim()}
      </FirstPostTitle>
      <FirstPostBody numberOfLines={10}>{posts[0].text.trim()}</FirstPostBody>
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
