import { DEFAULT_CHANNEL, SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { BulletinBoardData } from "../models/BBPost";
import { playBeep } from "../utils/beep";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useBulletinBoard = () => {
  const [latestPost, setLatestPost] = useState<BulletinBoardData | null>(null);

  useEffect(() => {
    (async () => {
      const { data: bbsData, error: bbsError } = await supabase
        .from<BulletinBoardData>("bulletinboard")
        .select("*")
        .eq("channel", DEFAULT_CHANNEL || "")
        .limit(1)
        .order("id", { ascending: false });
      setLatestPost(bbsData?.[0] ?? null);
    })();

    const bbsSub = supabase
      .from<BulletinBoardData>("bulletinboard")
      .on("INSERT", async (payload) => {
        if (payload.new.channel !== (DEFAULT_CHANNEL || "")) {
          return;
        }
        // NOTE: ビープ音再生終了まで待つ意味はない
        playBeep();
        setLatestPost(payload.new);
      })
      .subscribe();

    return () => {
      bbsSub.unsubscribe();
    };
  }, []);

  return { latestPost };
};

export default useBulletinBoard;
