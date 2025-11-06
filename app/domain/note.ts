import z from "zod";

export const NoteSchema = z.object({
  channel: z.string(),
  id: z.string(),
  heading: z.string(),
  text: z.string(),
  qrText: z.string().optional(),
  createdAt: z.number(),
});

export type NoteData = z.infer<typeof NoteSchema>;
