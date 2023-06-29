import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Tts from "react-native-tts";
import { fetchDetectLanguage } from "../api/language";
import { DetectLanguage } from "../models/Language";
import { supabase } from "../utils/supabase";

const useSpeech = () => {
  const [text, setText] = useState("");
  const {
    error: detectLangError,
    data: detectLangData,
    isLoading: isDetectLangLoading,
  } = useQuery<DetectLanguage>(
    ["detectLanguage", text],
    () => fetchDetectLanguage(encodeURIComponent(text)),
    {
      enabled: !!text.length,
    }
  );

  useEffect(() => {
    (async () => {
      supabase
        .channel("any")
        .on(
          "broadcast",
          {
            event: "speechRequest",
          },
          (payload) => {
            console.debug(payload);
            // if (payload.text.length) {
            //   setText(payload.text);
            // }
          }
        )
        .subscribe();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (detectLangData && !isDetectLangLoading && !!text.length) {
        try {
          await Tts.setDefaultLanguage(
            detectLangData.data.detections[0]?.[0]?.language
          );
        } catch (e) {
          await Tts.setDefaultLanguage("ja");
        }
        Tts.speak(text);
        setText("");
      }
    })();
  }, [detectLangData, isDetectLangLoading, text]);
};

export default useSpeech;
