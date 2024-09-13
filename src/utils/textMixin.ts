import { Appearance } from "react-native";
import { css } from "styled-components/native";

export const textMixin = css`
  color: ${Appearance.getColorScheme() === "dark" ? "#fff" : "#000"};
  font-weight: bold;
`;
