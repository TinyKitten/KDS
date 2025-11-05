import { CreditWidget } from "./components/Credit";
import { ClockWidget } from "./components/widgets/Clock";
import { NoteWidget } from "./components/widgets/Note";
import { WeatherWidget } from "./components/widgets/Weather";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between">
        <ClockWidget />
        <WeatherWidget />
      </div>

      <div className="flex flex-1 lg:mt-8 mt-4">
        <NoteWidget latestNote={null} />
      </div>

      <div className="flex flex-row h-12 max-w-1/3 justify-start">
        <CreditWidget />
      </div>
    </div>
  );
}
