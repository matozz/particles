import { useRef } from "react";

import { useScheduler } from "./core/scheduler";

function App() {
  const timerRef = useRef<number>();

  const { playing, start, stop } = useScheduler((60 / 128) * 1000, {
    onTick: () => {
      if (!timerRef.current) {
        timerRef.current = Date.now();
        console.log("init tick");
      } else {
        console.log("tick", Date.now() - timerRef.current);
        timerRef.current = Date.now();
      }
    },
  });

  return (
    <div className="text-center">
      <button onClick={playing ? stop : start}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export default App;
