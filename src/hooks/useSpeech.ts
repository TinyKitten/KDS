import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Tts from "react-native-tts";
import { detectLanguageFetcher } from "../api/language";
import { DetectLanguage } from "../models/Language";
import { SpeechRequestData } from "../models/SpeechRequest";
import { playBeep } from "../utils/beep";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useSpeech = () => {
  const [text, setText] = useState("");
  const {
    error: detectLangError,
    data: detectLangData,
    isLoading: isDetectLangLoading,
  } = useQuery<DetectLanguage>(
    ["detectLanguage", text],
    () => detectLanguageFetcher(encodeURIComponent(text)),
    {
      enabled: !!text.length,
    }
  );

  useEffect(() => {
    const sub = supabase
      .from<SpeechRequestData>("speechRequest")
      .on("INSERT", async (payload) => {
        if (payload.new.text.length) {
          await playBeep();
          setText(payload.new.text);
        }
      })
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
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
