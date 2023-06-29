import { Audio } from "expo-av";
import { useCallback, useEffect, useState } from "react";
import { BulletinBoardData } from "../models/BBPost";
import { supabase } from "../utils/supabase";

const useBulletinBoard = () => {
  const [posts, setPosts] = useState<BulletinBoardData[]>([]);
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
        .from("bulletinboard")
        .select("*")
        .order("id", { ascending: false });
      setPosts(data ?? []);

      supabase
        .channel("any")
        .on<BulletinBoardData>(
          "postgres_changes",
          { event: "*", schema: "public", table: "bulletinboard" },
          (payload) => {
            switch (payload.eventType) {
              case "INSERT":
                setPosts((prev) => [payload.new, ...prev]);
                break;
              case "UPDATE":
                setPosts((prev) =>
                  prev.flatMap((p) =>
                    p.id === payload.new.id ? payload.new : prev
                  )
                );
                break;
              case "DELETE":
                setPosts((prev) => prev.filter((p) => p.id !== payload.old.id));
                break;
              default:
                break;
            }
            playBeep();
          }
        )
        .subscribe();
    })();
  }, []);

  return posts;
};

export default useBulletinBoard;
