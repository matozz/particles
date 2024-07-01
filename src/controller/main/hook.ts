import { useEffect } from "react";
import { useScheduler } from "@/scheduler";
import { useControllerStore } from "../stores/controller";
import { handleTick } from "./tick";

export const useGlobalController = () => {
  const isPlaying = useControllerStore((state) => state.isPlaying);
  const settings = useControllerStore((state) => state.settings);

  const { start, stop } = useScheduler(settings.interval, handleTick);

  useEffect(() => {
    if (isPlaying) {
      start();
    } else {
      stop();
    }
  }, [isPlaying]);
};
