import styled from "styled-components/native";
import useDarkMode from "../hooks/useDarkMode";

const Typography = styled.Text<{ isDarkMode: boolean }>`
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
  font-weight: bold;
`;

// TODO: anyはダサいぞ
export const TypographyBase = (props: any) => {
  const isDarkMode = useDarkMode();
  return <Typography isDarkMode={isDarkMode} {...props} />;
};
