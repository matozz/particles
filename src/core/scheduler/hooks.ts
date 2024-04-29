import { useCallback, useEffect, useRef } from "react";

import { SchedulerHook } from "./types";

export const useScheduler: SchedulerHook = (interval, options) => {
  const { onTick } = options || {};

  const worker = useRef<Worker>();

  useEffect(() => {
    const timeWorker = new Worker(new URL("./worker.ts", import.meta.url));

    // timeWorker.onmessage = (e) => {
    //   if (e.data === "tick") {
    //     onTick?.();
    //   }
    // };

    worker.current = timeWorker;

    return () => {
      timeWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if (worker.current) {
      worker.current.onmessage = (e) => {
        if (e.data === "tick") {
          onTick?.();
        }
      };
    }
  }, [onTick, worker.current]);

  useEffect(() => {
    worker.current?.postMessage({ action: "interval", interval });
  }, [interval, worker]);

  const start = useCallback(() => {
    worker.current?.postMessage({ action: "start", interval });
  }, [interval]);

  const stop = useCallback(() => {
    worker.current?.postMessage({ action: "stop" });
  }, []);

  return { start, stop };
};