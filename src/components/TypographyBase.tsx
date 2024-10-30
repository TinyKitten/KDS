import { Text, TextProps } from "react-native";
import useDarkMode from "../hooks/useDarkMode";

export const TypographyBase = (props: TextProps) => {
  const isDarkMode = useDarkMode();

  return (
    <Text
      {...props}
      style={[
        {
          color: isDarkMode ? "#fff" : "#000",
          fontWeight: "bold",
          includeFontPadding: false,
          textAlignVertical: "center",
        },
        props.style,
      ]}
    />
  );
};
