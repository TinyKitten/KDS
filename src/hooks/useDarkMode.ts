import { useEffect, useState } from "react";
import { Appearance } from "react-native";

const useDarkMode = () => {
	const [isDark, setIsDark] = useState(Appearance.getColorScheme() === "dark");

	useEffect(() => {
		const sub = Appearance.addChangeListener((appearance) =>
			setIsDark(appearance.colorScheme === "dark"),
		);
		return sub.remove;
	}, []);

	return isDark;
};

export default useDarkMode;
