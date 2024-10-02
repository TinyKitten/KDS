import { isTablet } from "react-native-device-info";
import styled from "styled-components/native";
import useDarkMode from "../../hooks/useDarkMode";
import useSpeech from "../../hooks/useSpeech";
import { BulletinBoardData } from "../../models/BBPost";
import { TypographyBase } from "../TypographyBase";

const isSP = !isTablet();

const MemoWidget = ({
  latestPost,
}: {
  latestPost: BulletinBoardData | null;
}) => {
  useSpeech();
  const isDarkMode = useDarkMode();

  if (!latestPost) {
    return (
      <Container>
        <PostTitle isDarkMode={isDarkMode} numberOfLines={1}>
          Kitten Digital Signage(KDS)
        </PostTitle>
        <PostBody isDarkMode={isDarkMode} numberOfLines={isSP ? 5 : 6}>
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
      <PostBody isDarkMode={isDarkMode} numberOfLines={isSP ? 5 : 6}>
        {latestPost.text}
      </PostBody>
    </Container>
  );
};

export const MemoWidgetContainer = styled.View`
  position: absolute;
  margin-top: ${isSP ? "16px" : 0};
  top: 25%;
  bottom: 0;
  padding-right: 150px;
`;

const Container = styled.View`
  height: 100%;
`;

const PostTitle = styled(TypographyBase)`
  font-size: 32px;
`;

const PostBody = styled(TypographyBase)`
  font-size: ${isSP ? "20px" : "24px"};
  flex: 1;
`;
export default MemoWidget;
