import { CreditWidget } from "./components/Credit";
import { ClockWidget } from "./components/widgets/Clock";
import { NoteWidget } from "./components/widgets/Note";
import { WeatherWidget } from "./components/widgets/Weather";

export default function Home() {
  return (
    <div className="flex flex-col p-12 min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex justify-between gap-4">
        <ClockWidget />
        <WeatherWidget />
      </div>

      <div className="flex flex-1 mt-8">
        <NoteWidget latestNote={null} />
      </div>

      <div className="flex flex-row h-16 max-w-1/3 justify-start items-center">
        <CreditWidget />
      </div>
    </div>
  );
}
