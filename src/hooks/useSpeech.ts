import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import Tts from "react-native-tts";
import { SpeechRequestData } from "../models/SpeechRequest";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const useSpeech = () => {
  useEffect(() => {
    (async () => {
      supabase
        .from<SpeechRequestData>("speechRequest")
        .on("INSERT", (payload) => {
          if (payload.new.text.length) {
            Tts.speak(payload.new.text);
          }
        })
        .subscribe();
    })();
  }, []);
};

export default useSpeech;
