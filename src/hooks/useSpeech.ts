import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Tts from "react-native-tts";
import { fetchDetectLanguage } from "../api/language";
import { DetectLanguage } from "../models/Language";
import { SpeechRequestData } from "../models/SpeechRequest";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
        .from<SpeechRequestData>("speechRequest")
        .on("INSERT", (payload) => {
          if (payload.new.text.length) {
            setText(payload.new.text);
          }
        })
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
