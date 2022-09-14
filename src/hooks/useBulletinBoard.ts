import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { bulletinBoardData } from "../models/BBPost";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useBulletinBoard = () => {
  const [posts, setPosts] = useState<bulletinBoardData[]>([]);

  useEffect(() => {
    (async () => {
      let { data, error } = await supabase
        .from<bulletinBoardData>("bulletinboard")
        .select("*");
      if (data) {
        setPosts(data);
      }
      supabase
        .from("bulletinboard")
        .on("*", (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setPosts((prev) => [payload.new, ...prev]);
              break;
            case "UPDATE":
              setPosts((prev) =>
                prev.map((p) => (p.id === payload.new.id ? payload.new : prev))
              );
              break;
            case "DELETE":
              setPosts((prev) => prev.filter((p) => p.id === payload.new.id));
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
