import { useEffect } from "react";

import { useScheduler } from "@/scheduler";

import { useControllerStore } from "../stores/controller";
import { handleTick } from "./tick";

export const useGlobalController = () => {
  const playing = useControllerStore((state) => state.playing);
  const settings = useControllerStore((state) => state.settings);

  const { start, stop } = useScheduler(settings.interval, handleTick);

  useEffect(() => {
    if (playing) {
      start();
    } else {
      stop();
    }
  }, [playing]);
};