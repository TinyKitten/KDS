"use client";
import useClock from "@/app/hooks/useClock";
import { Typography } from "../Typography";

export const ClockWidget = () => {
  const { date, time } = useClock();

  return (
    <div className="max-w-1/3 ">
      <Typography className="font-bold text-xl">{date}</Typography>
      <Typography className="font-bold text-5xl">{time}</Typography>
    </div>
  );
};
