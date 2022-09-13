import dayjs from "dayjs";
import { useEffect, useState } from "react";

const useClock = () => {
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    setInterval(() => {
      const now = dayjs();
      setDateString(now.format("MMMM DD, YYYY"));
      setTimeString(now.format("HH:mm"));
    }, 1000);
  }, []);

  return {
    date: dateString,
    time: timeString,
  };
};

export default useClock;
