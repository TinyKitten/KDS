import { useEffect } from "react";
import { NoteData, NoteSchema } from "../domain/note";

export const useNoteStreaming = (
  channel: string,
  onNewNote: (noteData: NoteData) => void
) => {
  useEffect(() => {
    const eventSource = new EventSource(
      `/api/note/subscribe?channel=${channel}`
    );

    eventSource.onmessage = (event) => {
      const result = NoteSchema.safeParse(event.data);
      if (result.success) {
        onNewNote(result.data);
      } else {
        console.error("Invalid note data:", result.error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [channel, onNewNote]);
};
