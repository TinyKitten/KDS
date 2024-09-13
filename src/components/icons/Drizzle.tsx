import React from "react";
import { Appearance } from "react-native";
import { Path, Svg } from "react-native-svg";

const Drizzle = () => (
  <Svg viewBox="0 0 118 118" fill="none">
    <Path
      d="M31.7768 91.6641C30.3917 91.6641 29.2306 91.1956 28.2936 90.2586C27.3566 89.3215 26.8881 88.1605 26.8881 86.7753C26.8881 85.3902 27.3566 84.2291 28.2936 83.2921C29.2306 82.3551 30.3917 81.8866 31.7768 81.8866C33.162 81.8866 34.3231 82.3551 35.2601 83.2921C36.1971 84.2291 36.6656 85.3902 36.6656 86.7753C36.6656 88.1605 36.1971 89.3215 35.2601 90.2586C34.3231 91.1956 33.162 91.6641 31.7768 91.6641ZM46.4431 107.553C45.0579 107.553 43.8969 107.084 42.9599 106.147C42.0228 105.21 41.5543 104.049 41.5543 102.664C41.5543 101.279 42.0228 100.118 42.9599 99.1805C43.8969 98.2435 45.0579 97.775 46.4431 97.775C47.8282 97.775 48.9893 98.2435 49.9263 99.1805C50.8633 100.118 51.3318 101.279 51.3318 102.664C51.3318 104.049 50.8633 105.21 49.9263 106.147C48.9893 107.084 47.8282 107.553 46.4431 107.553ZM61.1093 91.6641C59.7242 91.6641 58.5631 91.1956 57.6261 90.2586C56.6891 89.3215 56.2206 88.1605 56.2206 86.7753C56.2206 85.3902 56.6891 84.2291 57.6261 83.2921C58.5631 82.3551 59.7242 81.8866 61.1093 81.8866C62.4945 81.8866 63.6556 82.3551 64.5926 83.2921C65.5296 84.2291 65.9981 85.3902 65.9981 86.7753C65.9981 88.1605 65.5296 89.3215 64.5926 90.2586C63.6556 91.1956 62.4945 91.6641 61.1093 91.6641ZM90.4418 91.6641C89.0567 91.6641 87.8956 91.1956 86.9586 90.2586C86.0216 89.3215 85.5531 88.1605 85.5531 86.7753C85.5531 85.3902 86.0216 84.2291 86.9586 83.2921C87.8956 82.3551 89.0567 81.8866 90.4418 81.8866C91.827 81.8866 92.9881 82.3551 93.9251 83.2921C94.8621 84.2291 95.3306 85.3902 95.3306 86.7753C95.3306 88.1605 94.8621 89.3215 93.9251 90.2586C92.9881 91.1956 91.827 91.6641 90.4418 91.6641ZM75.7756 107.553C74.3904 107.553 73.2294 107.084 72.2924 106.147C71.3553 105.21 70.8868 104.049 70.8868 102.664C70.8868 101.279 71.3553 100.118 72.2924 99.1805C73.2294 98.2435 74.3904 97.775 75.7756 97.775C77.1607 97.775 78.3218 98.2435 79.2588 99.1805C80.1958 100.118 80.6643 101.279 80.6643 102.664C80.6643 104.049 80.1958 105.21 79.2588 106.147C78.3218 107.084 77.1607 107.553 75.7756 107.553ZM35.4434 70.8869C28.3547 70.8869 22.3049 68.3814 17.2939 63.3704C12.2829 58.3595 9.77747 52.3096 9.77747 45.221C9.77747 38.7841 12.0793 33.0398 16.6828 27.9881C21.2864 22.9364 27.0103 20.1661 33.8546 19.6772C36.4619 15.1144 39.9044 11.5089 44.182 8.86087C48.4597 6.2128 53.2873 4.88876 58.665 4.88876C66.0796 4.88876 72.2924 7.23129 77.3033 11.9163C82.3143 16.6014 85.3901 22.4068 86.5308 29.3325C92.9677 29.6584 98.0805 31.838 101.869 35.8712C105.658 39.9044 107.552 44.6506 107.552 50.1097C107.552 55.8132 105.536 60.702 101.503 64.776C97.4694 68.8499 92.5603 70.8869 86.7753 70.8869H35.4434ZM35.4434 63.5538H86.7753C90.5233 63.5538 93.701 62.2297 96.3083 59.5817C98.9157 56.9336 100.219 53.7355 100.219 49.9875C100.219 46.3209 98.9157 43.184 96.3083 40.5766C93.701 37.9693 90.5233 36.6656 86.7753 36.6656H79.4422V32.9991C79.4422 27.2141 77.4255 22.3049 73.3923 18.2717C69.3591 14.2385 64.45 12.2219 58.665 12.2219C54.5095 12.2219 50.7004 13.3422 47.2375 15.5829C43.7747 17.8236 41.2284 20.8587 39.5988 24.6882L38.6211 26.8881H35.199C30.1473 27.0511 25.8696 28.9047 22.366 32.4491C18.8624 35.9934 17.1106 40.2507 17.1106 45.221C17.1106 50.2727 18.9031 54.5911 22.4882 58.1761C26.0733 61.7612 30.3917 63.5538 35.4434 63.5538Z"
      fill={Appearance.getColorScheme() === "dark" ? "#fff" : "#000"}
    />
  </Svg>
);

export default Drizzle;
