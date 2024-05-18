import { useEffect } from "react";

import { useScheduler } from "@/core/scheduler";

import { useControllerStore, useRuntimeStore } from "../stores";
import { handleTick } from "./handle_tick";

export const useGlobalController = () => {
  const playing = useControllerStore((state) => state.playing);
  const settings = useControllerStore((state) => state.settings);

  const { start, stop } = useScheduler(settings.interval, handleTick);

  useEffect(() => {
    if (playing) {
      start();
    } else {
      stop();

      useRuntimeStore.getState().reset();
    }
  }, [playing]);
};
