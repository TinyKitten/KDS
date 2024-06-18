import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { Audio } from "expo-av";
import { useCallback, useEffect, useState } from "react";
import { BulletinBoardData } from "../models/BBPost";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useBulletinBoard = () => {
  const [latestPost, setLatestPost] = useState<BulletinBoardData | null>(null);
  const [sound, setSound] = useState<Audio.Sound>();

  const playBeep = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/beep.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from<BulletinBoardData>("bulletinboard")
        .select("*")
        .limit(1)
        .order("id", { ascending: false });
      if (error) {
        console.error(error);
      }
      setLatestPost(data?.[0] ?? null);
    })();

    const sub = supabase
      .from<BulletinBoardData>("bulletinboard")
      .on("*", (payload) => {
        playBeep();
        setLatestPost(payload.new);
      })
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return latestPost;
};

export default useBulletinBoard;
