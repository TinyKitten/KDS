import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

const Rainy = ({ fill }: SvgProps) => (
  <Svg viewBox="0 0 118 118" fill="none">
    <Path
      d="M68.198 107.186C67.3018 107.593 66.3444 107.634 65.3259 107.308C64.3074 106.982 63.5945 106.371 63.1871 105.475L54.754 88.6086C54.3466 87.7123 54.2855 86.7549 54.5706 85.7365C54.8558 84.718 55.4465 84.005 56.3428 83.5976C57.2391 83.1902 58.1965 83.1495 59.215 83.4754C60.2334 83.8013 60.9464 84.4124 61.3538 85.3087L69.7869 102.175C70.1943 103.071 70.2554 104.029 69.9702 105.047C69.685 106.066 69.0943 106.778 68.198 107.186ZM97.5305 107.064C96.6343 107.471 95.6769 107.512 94.6584 107.186C93.6399 106.86 92.927 106.249 92.5196 105.353L84.0865 88.4864C83.6791 87.5901 83.618 86.6327 83.9031 85.6142C84.1883 84.5957 84.779 83.8828 85.6753 83.4754C86.5716 83.068 87.529 83.0273 88.5474 83.3532C89.5659 83.6791 90.2789 84.2902 90.6863 85.1865L99.1194 102.053C99.5268 102.949 99.5879 103.906 99.3027 104.925C99.0175 105.943 98.4268 106.656 97.5305 107.064ZM38.8655 107.064C37.9693 107.471 37.0119 107.532 35.9934 107.247C34.9749 106.962 34.262 106.371 33.8546 105.475L25.4215 88.6086C25.0141 87.7123 24.9733 86.7549 25.2992 85.7365C25.6252 84.718 26.2363 84.005 27.1325 83.5976C28.0288 83.1902 28.9862 83.1291 30.0047 83.4143C31.0232 83.6995 31.7361 84.2902 32.1435 85.1865L40.5766 102.175C40.984 103.071 41.0247 104.008 40.6988 104.986C40.3729 105.964 39.7618 106.656 38.8655 107.064V107.064ZM35.4434 75.7756C28.3547 75.7756 22.3049 73.2701 17.2939 68.2592C12.2829 63.2482 9.77747 57.1984 9.77747 50.1097C9.77747 43.6728 12.0793 37.9286 16.6828 32.8768C21.2864 27.8251 27.0103 25.0548 33.8546 24.566C36.4619 20.0031 39.9044 16.3977 44.182 13.7496C48.4597 11.1015 53.2873 9.7775 58.665 9.7775C66.0796 9.7775 72.2924 12.12 77.3033 16.8051C82.3143 21.4901 85.3901 27.2955 86.5308 34.2213C92.9677 34.5472 98.0805 36.7267 101.869 40.76C105.658 44.7932 107.552 49.5393 107.552 54.9984C107.552 60.702 105.536 65.5907 101.503 69.6647C97.4694 73.7386 92.5603 75.7756 86.7753 75.7756H35.4434ZM35.4434 68.4425H86.7753C90.5233 68.4425 93.701 67.1185 96.3083 64.4704C98.9157 61.8223 100.219 58.665 100.219 54.9984C100.219 51.2504 98.9157 48.0727 96.3083 45.4654C93.701 42.858 90.5233 41.5544 86.7753 41.5544H79.4422V37.8878C79.4422 32.1028 77.4255 27.1937 73.3923 23.1605C69.3591 19.1272 64.45 17.1106 58.665 17.1106C54.5095 17.1106 50.7004 18.231 47.2375 20.4716C43.7747 22.7123 41.2284 25.7474 39.5988 29.5769L38.6211 31.7769H35.199C30.1473 31.9398 25.8696 33.7935 22.366 37.3378C18.8624 40.8822 17.1106 45.1395 17.1106 50.1097C17.1106 55.1614 18.9031 59.4798 22.4882 63.0649C26.0733 66.65 30.3917 68.4425 35.4434 68.4425Z"
      fill={fill}
    />
  </Svg>
);

export default Rainy;
