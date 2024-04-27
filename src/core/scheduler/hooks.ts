import { useEffect, useRef, useState } from "react";

import { SchedulerHook } from "./types";

export const useScheduler: SchedulerHook = (interval, options) => {
  const { onTick } = options;

  const worker = useRef<Worker>();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const timeWorker = new Worker(new URL("./worker.ts", import.meta.url));

    timeWorker.onmessage = (e) => {
      if (e.data === "tick") {
        onTick();
      }
    };

    worker.current = timeWorker;

    return () => {
      timeWorker.terminate();
    };
  }, []);

  useEffect(() => {
    worker.current?.postMessage({ action: "interval", interval });
  }, [interval, worker]);

  const start = () => {
    setPlaying(true);
    worker.current?.postMessage({ action: "start", interval });
  };

  const stop = () => {
    setPlaying(false);
    worker.current?.postMessage({ action: "stop" });
  };

  return { playing, start, stop };
};
