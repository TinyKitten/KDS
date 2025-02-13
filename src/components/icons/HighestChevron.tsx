import React from "react";
import { Path, Svg, type SvgProps } from "react-native-svg";

const HighestChevron = ({ fill }: SvgProps) => (
	<Svg width="12" height="8" viewBox="0 0 12 8" fill="none">
		<Path
			d="M1.075 7.075L0 6L6 0L12 5.975L10.925 7.05L6 2.125L1.075 7.075Z"
			fill={fill}
		/>
	</Svg>
);

export default HighestChevron;
