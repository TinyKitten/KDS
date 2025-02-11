import { GOOGLE_CLOUD_API_KEY } from "@env";

export const detectLanguageFetcher = async (text: string) => {
	const res = await fetch(
		`https://translation.googleapis.com/language/translate/v2/detect?q=${text}&key=${GOOGLE_CLOUD_API_KEY}`,
	);
	return res.json();
};
