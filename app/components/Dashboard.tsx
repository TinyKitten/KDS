"use client";

import { CreditWidget } from "../components/Credit";
import { ClockWidget } from "../components/widgets/Clock";
import { NoteWidget } from "../components/widgets/Note";
import { WeatherWidget } from "../components/widgets/Weather";
import useSWR from "swr";
import { noteFetcher } from "../fetchers/note";
import { useState } from "react";
import { NoteData } from "../domain/note";
import { useNoteStreaming } from "../hooks/useNoteStreaming";
import { useSearchParams } from "next/navigation";

export const Dashboard = () => {
  const searchParams = useSearchParams();

  const channelParam = searchParams.get("channel") || "everyone";

  const {
    data: firstNoteData,
    error: firstNoteError,
    isLoading: firstNoteLoading,
  } = useSWR(channelParam, noteFetcher);

  const [noteDataBuffer, setNoteDataBuffer] = useState<NoteData | null>(null);

  useNoteStreaming(channelParam, (newNote) => {
    setNoteDataBuffer(newNote);
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between">
        <ClockWidget />
        <WeatherWidget />
      </div>

      <div className="flex flex-1 lg:mt-8 mt-4">
        <NoteWidget
          latestNote={noteDataBuffer ?? firstNoteData ?? null}
          loading={firstNoteLoading}
          error={firstNoteError}
        />
      </div>

      <div className="flex flex-row h-12 max-w-1/3 justify-start">
        <CreditWidget />
      </div>
    </div>
  );
};
