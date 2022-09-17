import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { BulletinBoardData } from "../models/BBPost";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useBulletinBoard = () => {
  const [posts, setPosts] = useState<BulletinBoardData[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from<BulletinBoardData>("bulletinboard")
        .select("*")
        .order("id", { ascending: false });
      setPosts(data ?? []);

      supabase
        .from<BulletinBoardData>("bulletinboard")
        .on("*", (payload) => {
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
        })
        .subscribe();
    })();
  }, []);

  return posts;
};

export default useBulletinBoard;
