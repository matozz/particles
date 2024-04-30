import { useCallback, useEffect, useRef } from "react";

import { SchedulerHook } from "./types";

export const useScheduler: SchedulerHook = (interval, options) => {
  const { onTick } = options || {};

  const worker = useRef<Worker>();
  const stopRef = useRef(false);

  useEffect(() => {
    const timeWorker = new Worker(new URL("./worker.ts", import.meta.url));

    worker.current = timeWorker;

    return () => {
      timeWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if (worker.current) {
      worker.current.onmessage = (e) => {
        if (e.data === "tick") {
          onTick?.({ stopRef });
        }
      };
    }
  }, [onTick, worker.current]);

  useEffect(() => {
    worker.current?.postMessage({ action: "interval", interval });
  }, [interval, worker]);

  const start = useCallback(() => {
    worker.current?.postMessage({ action: "start", interval });
    stopRef.current = false;
  }, [interval]);

  const stop = useCallback(() => {
    worker.current?.postMessage({ action: "stop" });
    stopRef.current = true;
  }, []);

  return { start, stop };
};
