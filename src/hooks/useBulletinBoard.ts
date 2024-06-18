import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { BulletinBoardData } from "../models/BBPost";
import { playBeep } from "../utils/beep";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useBulletinBoard = () => {
  const [latestPost, setLatestPost] = useState<BulletinBoardData | null>(null);

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
      .on("INSERT", async (payload) => {
        // NOTE: ビープ音再生終了まで待つ意味はない
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
