import { isTablet } from "react-native-device-info";
import styled from "styled-components/native";
import useSpeech from "../../hooks/useSpeech";
import type { BulletinBoardData } from "../../models/BBPost";
import { TypographyBase } from "../TypographyBase";

const isSP = !isTablet();

const MemoWidget = ({
	latestPost,
}: {
	latestPost: BulletinBoardData | null;
}) => {
	useSpeech();

	if (!latestPost) {
		return (
			<Container>
				<PostTitle numberOfLines={1}>Kitten Digital Signage(KDS)</PostTitle>
				<PostBody numberOfLines={isSP ? 6 : 8}>
					KDSにようこそ。KDSはタブレット端末で使用できるオープンソースのデジタルサイネージシステムです。専用アプリでこのパネルのテキストを書き換えてメモ帳代わりにできたり、アプリから送信したテキストを読み上げることもできます。
				</PostBody>
			</Container>
		);
	}

	return (
		<Container>
			<PostTitle numberOfLines={1}>{latestPost.heading}</PostTitle>
			<PostBody numberOfLines={isSP ? 6 : 8}>{latestPost.text}</PostBody>
		</Container>
	);
};

export const MemoWidgetContainer = styled.View`
  flex: 1;
  overflow: hidden;
`;

const Container = styled.View``;

const PostTitle = styled(TypographyBase)`
  font-size: 32px;
  line-height: 48px;
`;

const PostBody = styled(TypographyBase)`
  font-size: ${isSP ? 18 : 24}px;
`;
export default MemoWidget;
