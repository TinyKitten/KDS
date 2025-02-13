import { Audio } from "expo-av";

export const playBeep = () =>
	new Promise<void>((resolve) => {
		Audio.Sound.createAsync(require("../assets/beep.mp3")).then(({ sound }) => {
			sound.playAsync();
			sound.setOnPlaybackStatusUpdate((status) => {
				if (status.isLoaded && status.didJustFinish) {
					resolve();
				}
			});
		});
	});

export const playUrgentBuzzer = () =>
	new Promise<void>((resolve) => {
		Audio.Sound.createAsync(require("../assets/urgentBuzzer.mp3")).then(
			({ sound }) => {
				sound.playAsync();
				sound.setOnPlaybackStatusUpdate((status) => {
					if (status.isLoaded && status.didJustFinish) {
						resolve();
					}
				});
			},
		);
	});
