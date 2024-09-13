import { Dimensions } from "react-native";
import { isTablet } from "react-native-device-info";
import styled from "styled-components/native";
import useDarkMode from "../../hooks/useDarkMode";
import useSpeech from "../../hooks/useSpeech";
import { BulletinBoardData } from "../../models/BBPost";
import { TypographyBase } from "../TypographyBase";

const windowHeight = Dimensions.get("window").height;
const fullPostBodyHeight = windowHeight / 24;
const postBodyHeightNumberOfLines = fullPostBodyHeight / 4;

const MemoWidget = ({
  latestPost,
}: {
  latestPost: BulletinBoardData | null;
}) => {
  useSpeech();
  const isDarkMode = useDarkMode();

  if (!isTablet()) {
    return null;
  }

  if (!latestPost) {
    return (
      <Container>
        <PostTitle isDarkMode={isDarkMode} numberOfLines={1}>
          Kitten Digital Signage(KDS)
        </PostTitle>
        <PostBody
          isDarkMode={isDarkMode}
          numberOfLines={postBodyHeightNumberOfLines}
        >
          KDSにようこそ。KDSはタブレット端末で使用できるオープンソースのデジタルサイネージシステムです。専用アプリでこのパネルのテキストを書き換えてメモ帳代わりにできたり、アプリから送信したテキストを読み上げることもできます。
        </PostBody>
      </Container>
    );
  }

  return (
    <Container>
      <PostTitle isDarkMode={isDarkMode} numberOfLines={1}>
        {latestPost.heading}
      </PostTitle>
      <PostBody
        isDarkMode={isDarkMode}
        numberOfLines={postBodyHeightNumberOfLines}
      >
        {latestPost.text}
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

const PostTitle = styled(TypographyBase)`
  font-size: 32px;
`;

const PostBody = styled(TypographyBase)`
  font-size: 24px;
`;
export default MemoWidget;
