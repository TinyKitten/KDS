import { useCallback, useEffect, useState } from "react";
import ANALECTS from "../../assets/analects.json";
import Analect from "../models/Analect";

const useAnalect = (): Analect | undefined => {
  const [analect, setAnalect] = useState<Analect>();

  const updateAnalect = useCallback(() => {
    const rand = Math.floor(Math.random() * ANALECTS.length);
    setAnalect(ANALECTS[rand]);
  }, []);

  useEffect(() => {
    updateAnalect();
    setInterval(updateAnalect, 1000 * 60 * 60); // 1h
  }, []);

  return analect;
};

export default useAnalect;
