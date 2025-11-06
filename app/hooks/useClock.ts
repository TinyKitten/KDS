import dayjs from "dayjs";
import { useEffect, useState } from "react";

const useClock = () => {
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = dayjs();
      setDateString(now.format("MMMM DD, YYYY"));
      setTimeString(now.format("HH:mm"));
    };

    updateTime();
    const intervalId = setInterval(() => {
      updateTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    date: dateString,
    time: timeString,
  };
};

export default useClock;
