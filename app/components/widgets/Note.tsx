import { NoteData } from "@/app/domain/note";
import { Typography } from "../Typography";

const FALLBACK_NOTE: Partial<NoteData> = {
  heading: "Kitten Digital Signage(KDS)",
  text: "KDSにようこそ。KDSはWebブラウザで使用できるオープンソースのデジタルサイネージシステムです。専用アプリでこのパネルのテキストを書き換えてメモ帳代わりにできたり、アプリから送信したテキストを読み上げることもできます。",
} as const;

export const NoteWidget = ({ latestNote }: { latestNote: NoteData | null }) => {
  return (
    <div className="flex flex-col gap-1 lg:gap-3">
      <Typography element="h1" className="text-3xl lg:text-4xl font-bold">
        {latestNote?.heading ?? FALLBACK_NOTE.heading}
      </Typography>
      <Typography
        element="p"
        className="text-lg leading-relaxed lg:text-xl font-bold"
      >
        {latestNote?.text ?? FALLBACK_NOTE.text}
      </Typography>
    </div>
  );
};
