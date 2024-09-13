import React from "react";
import { Appearance } from "react-native";
import { Path, Svg } from "react-native-svg";

const Sunny = () => (
  <Svg viewBox="0 0 118 118" fill="none">
    <Path
      d="M58.6667 20C57.5111 20 56.5556 19.6222 55.8 18.8667C55.0444 18.1111 54.6667 17.1556 54.6667 16V4C54.6667 2.84444 55.0444 1.88889 55.8 1.13333C56.5556 0.377778 57.5111 0 58.6667 0C59.8222 0 60.7778 0.377778 61.5333 1.13333C62.2889 1.88889 62.6667 2.84444 62.6667 4V16C62.6667 17.1556 62.2889 18.1111 61.5333 18.8667C60.7778 19.6222 59.8222 20 58.6667 20ZM86 31.3333C85.2 30.5333 84.8 29.6 84.8 28.5333C84.8 27.4667 85.2 26.5333 86 25.7333L94.4 17.2C95.2 16.4 96.1556 16 97.2667 16C98.3778 16 99.3333 16.4 100.133 17.2C100.933 18 101.333 18.9333 101.333 20C101.333 21.0667 100.933 22 100.133 22.8L91.6 31.3333C90.8 32.1333 89.8667 32.5333 88.8 32.5333C87.7333 32.5333 86.8 32.1333 86 31.3333ZM101.333 62.6667C100.178 62.6667 99.2222 62.2889 98.4667 61.5333C97.7111 60.7778 97.3333 59.8222 97.3333 58.6667C97.3333 57.5111 97.7111 56.5556 98.4667 55.8C99.2222 55.0444 100.178 54.6667 101.333 54.6667H113.333C114.489 54.6667 115.444 55.0444 116.2 55.8C116.956 56.5556 117.333 57.5111 117.333 58.6667C117.333 59.8222 116.956 60.7778 116.2 61.5333C115.444 62.2889 114.489 62.6667 113.333 62.6667H101.333ZM58.6667 117.333C57.5111 117.333 56.5556 116.956 55.8 116.2C55.0444 115.444 54.6667 114.489 54.6667 113.333V101.333C54.6667 100.178 55.0444 99.2222 55.8 98.4667C56.5556 97.7111 57.5111 97.3333 58.6667 97.3333C59.8222 97.3333 60.7778 97.7111 61.5333 98.4667C62.2889 99.2222 62.6667 100.178 62.6667 101.333V113.333C62.6667 114.489 62.2889 115.444 61.5333 116.2C60.7778 116.956 59.8222 117.333 58.6667 117.333ZM25.7333 31.3333L17.2 22.9333C16.4 22.1333 16 21.1778 16 20.0667C16 18.9556 16.4 18 17.2 17.2C18 16.4 18.9333 16 20 16C21.0667 16 22 16.4 22.8 17.2L31.3333 25.7333C32.1333 26.5333 32.5333 27.4667 32.5333 28.5333C32.5333 29.6 32.1333 30.5333 31.3333 31.3333C30.5333 32.0444 29.5778 32.4 28.4667 32.4C27.3556 32.4 26.4444 32.0444 25.7333 31.3333ZM94.5333 100.133L86 91.6C85.2 90.8 84.8 89.8667 84.8 88.8C84.8 87.7333 85.2 86.8 86 86C86.7111 85.2889 87.6222 84.9333 88.7333 84.9333C89.8445 84.9333 90.8 85.2889 91.6 86L100.267 94.4C101.067 95.2 101.444 96.1556 101.4 97.2667C101.356 98.3778 100.978 99.3333 100.267 100.133C99.4667 100.933 98.5111 101.333 97.4 101.333C96.2889 101.333 95.3333 100.933 94.5333 100.133V100.133ZM4 62.6667C2.84444 62.6667 1.88889 62.2889 1.13333 61.5333C0.377778 60.7778 0 59.8222 0 58.6667C0 57.5111 0.377778 56.5556 1.13333 55.8C1.88889 55.0444 2.84444 54.6667 4 54.6667H16C17.1556 54.6667 18.1111 55.0444 18.8667 55.8C19.6222 56.5556 20 57.5111 20 58.6667C20 59.8222 19.6222 60.7778 18.8667 61.5333C18.1111 62.2889 17.1556 62.6667 16 62.6667H4ZM17.2 100.133C16.4 99.3333 16 98.4 16 97.3333C16 96.2667 16.4 95.3333 17.2 94.5333L25.7333 86C26.4444 85.2889 27.3556 84.9333 28.4667 84.9333C29.5778 84.9333 30.5333 85.2889 31.3333 86C32.1333 86.8 32.5333 87.7556 32.5333 88.8667C32.5333 89.9778 32.1333 90.9333 31.3333 91.7333L22.9333 100.133C22.1333 100.933 21.1778 101.333 20.0667 101.333C18.9556 101.333 18 100.933 17.2 100.133V100.133ZM58.6667 90.6667C49.7778 90.6667 42.2222 87.5556 36 81.3333C29.7778 75.1111 26.6667 67.5556 26.6667 58.6667C26.6667 49.7778 29.7778 42.2222 36 36C42.2222 29.7778 49.7778 26.6667 58.6667 26.6667C67.5556 26.6667 75.1111 29.7778 81.3333 36C87.5556 42.2222 90.6667 49.7778 90.6667 58.6667C90.6667 67.5556 87.5556 75.1111 81.3333 81.3333C75.1111 87.5556 67.5556 90.6667 58.6667 90.6667ZM58.6667 82.6667C65.3333 82.6667 71 80.3333 75.6667 75.6667C80.3333 71 82.6667 65.3333 82.6667 58.6667C82.6667 52 80.3333 46.3333 75.6667 41.6667C71 37 65.3333 34.6667 58.6667 34.6667C52 34.6667 46.3333 37 41.6667 41.6667C37 46.3333 34.6667 52 34.6667 58.6667C34.6667 65.3333 37 71 41.6667 75.6667C46.3333 80.3333 52 82.6667 58.6667 82.6667Z"
      fill={Appearance.getColorScheme() === "dark" ? "#fff" : "#000"}
    />
  </Svg>
);

export default Sunny;
