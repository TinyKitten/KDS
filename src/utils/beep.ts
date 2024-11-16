import { Audio } from "expo-av";

export const playBeep = () =>
  new Promise<void>(async (resolve) => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/beep.mp3"),
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        resolve();
      }
    });
  });

export const playUrgentBuzzer = () =>
  new Promise<void>(async (resolve) => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/urgentBuzzer.mp3"),
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        resolve();
      }
    });
  });
