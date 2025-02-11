const getRotation = (degree: number | undefined): string => {
	if (!degree) {
		return "";
	}

	if (degree === 0 || degree === 360) {
		return "N";
	}
	if (degree < 22) {
		return "N";
	}
	if (degree < 45) {
		return "NNE";
	}
	if (degree < 67) {
		return "NE";
	}
	if (degree < 90) {
		return "ENE";
	}
	if (degree < 112) {
		return "E";
	}
	if (degree < 135) {
		return "ESE";
	}
	if (degree < 157) {
		return "SE";
	}
	if (degree < 180) {
		return "SSE";
	}
	if (degree < 202) {
		return "S";
	}
	if (degree < 225) {
		return "SSW";
	}
	if (degree < 247) {
		return "SW";
	}
	if (degree < 270) {
		return "WSW";
	}
	if (degree < 292) {
		return "W";
	}
	if (degree < 315) {
		return "WNW";
	}
	if (degree < 337) {
		return "NW";
	}
	if (degree < 360) {
		return "NNW";
	}
	return "";
};

export default getRotation;
