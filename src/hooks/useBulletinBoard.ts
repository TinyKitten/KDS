import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { BulletinBoardData } from "../models/BBPost";
import { playBeep } from "../utils/beep";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useBulletinBoard = () => {
  const [latestPost, setLatestPost] = useState<BulletinBoardData | null>(null);
  const [qrText, setQRText] = useState("");

  useEffect(() => {
    (async () => {
      const { data: bbsData, error: bbsError } = await supabase
        .from<BulletinBoardData>("bulletinboard")
        .select("*")
        .limit(1)
        .order("id", { ascending: false });
      setLatestPost(bbsData?.[0] ?? null);
      const { data: qrData, error: qrError } = await supabase
        .from<{ id: number; text: string }>("qr")
        .select("*")
        .limit(1)
        .order("id", { ascending: false });
      setQRText(qrData?.[0]?.text ?? "");
    })();

    const bbsSub = supabase
      .from<BulletinBoardData>("bulletinboard")
      .on("INSERT", async (payload) => {
        // NOTE: ビープ音再生終了まで待つ意味はない
        playBeep();
        setLatestPost(payload.new);
      })
      .subscribe();

    const qrSub = supabase
      .from<{ text: string }>("qr")
      .on("INSERT", async (payload) => {
        playBeep();
        setQRText(payload.new.text);
      })
      .subscribe();

    return () => {
      bbsSub.unsubscribe();
      qrSub.unsubscribe();
    };
  }, []);

  return { latestPost, qrText };
};

export default useBulletinBoard;
