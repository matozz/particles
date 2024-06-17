import { useCallback, useEffect, useRef } from "react";

import SchedulerWorker from "./scheduler.worker?worker&inline";
import { SchedulerHook } from "./types";

export const useScheduler: SchedulerHook = (interval, onTick) => {
  const worker = useRef<Worker>(undefined);

  useEffect(() => {
    worker.current = new SchedulerWorker();

    return () => {
      worker.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (!worker.current) {
      return;
    }

    worker.current.onmessage = (e) => {
      e.data === "tick" && onTick?.();
    };
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

export * from "./types";
