import { NoteData } from "../domain/note";

export const noteFetcher = async (
  channel = "everyone"
): Promise<NoteData | null> => {
  const response = await fetch(`/api/note?channel=${channel}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch note data");
  }

  const data: NoteData = await response.json();
  return data;
};
