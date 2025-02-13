import { useMemo } from "react";
import { StyleSheet, Text, type TextProps } from "react-native";
import useDarkMode from "../hooks/useDarkMode";

export const TypographyBase = (props: TextProps) => {
	const isDarkMode = useDarkMode();

	const fontFamily = useMemo(() => {
		const flattenStyle = StyleSheet.flatten(props.style);

		const fontWeight = Number(flattenStyle.fontWeight ?? 600);

		switch (fontWeight) {
			case 500:
				return "Inter_500Medium";
			case 600:
				return "Inter_600SemiBold";
			case 900:
				return "Inter_900Black";
			default:
				return "Inter_600SemiBold";
		}
	}, [props.style]);

	return (
		<Text
			{...props}
			textBreakStrategy="highQuality"
			style={[
				{
					color: isDarkMode ? "#fff" : "#000",
					includeFontPadding: false,
					fontFamily,
				},
				props.style,
			]}
		/>
	);
};
