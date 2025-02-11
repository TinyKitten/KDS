import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

const LowestTempChevron = ({ fill }: SvgProps) => (
	<Svg width="12" height="8" viewBox="0 0 12 8" fill="none">
		<Path
			d="M6 7.075L0 1.075L1.075 0L6 4.95L10.925 0.0249996L12 1.1L6 7.075Z"
			fill={fill}
		/>
	</Svg>
);

export default LowestTempChevron;
