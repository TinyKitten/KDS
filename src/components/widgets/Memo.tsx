import { Dimensions } from "react-native";
import { isTablet } from "react-native-device-info";
import styled from "styled-components/native";
import useBulletinBoard from "../../hooks/useBulletinBoard";
import useSpeech from "../../hooks/useSpeech";
import { textMixin } from "../../utils/textMixin";

const windowHeight = Dimensions.get("window").height;
const fullPostBodyHeight = windowHeight / 24;
const postBodyHeightNumberOfLines = fullPostBodyHeight / 4;

const MemoWidget = () => {
  const post = useBulletinBoard();
  useSpeech();

  if (!isTablet()) {
    return null;
  }

  if (!post) {
    return (
      <Container>
        <PostTitle numberOfLines={1}>Kitten Digital Signage(KDS)</PostTitle>
        <PostBody numberOfLines={postBodyHeightNumberOfLines}>
          KDSにようこそ。KDSはタブレット端末で使用できるオープンソースのデジタルサイネージシステムです。専用アプリでこのパネルのテキストを書き換えてメモ帳代わりにできたり、アプリから送信したテキストを読み上げることもできます。
        </PostBody>
      </Container>
    );
  }

  return (
    <Container>
      <PostTitle numberOfLines={1}>{post.heading}</PostTitle>
      <PostBody numberOfLines={postBodyHeightNumberOfLines}>
        {post.text}
      </PostBody>
    </Container>
  );
};

export const MemoWidgetContainer = styled.View`
  position: absolute;
  top: 25%;
  padding-right: 150px;
`;

const Container = styled.View`
  height: 100%;
`;

const PostTitle = styled.Text`
  ${textMixin}
  font-size: 32px;
`;

const PostBody = styled.Text`
  ${textMixin}
  font-size: 24px;
`;
export default MemoWidget;
