import { useCallback, useEffect } from "react";
import { useScheduler } from "@/scheduler";
import { useControllerStore } from "../stores/controller";
import { tickPlaylist } from "../stores/playlist";
import { handleTick } from "./tick";

export const useGlobalController = () => {
  const isPlaying = useControllerStore((state) => state.isPlaying);
  const settings = useControllerStore((state) => state.settings);

  const onSchedulerTick = useCallback(() => {
    handleTick();
    tickPlaylist();
  }, []);

  const { start, stop } = useScheduler(settings.interval, onSchedulerTick);

  useEffect(() => {
    if (isPlaying) {
      start();
    } else {
      stop();
    }
  }, [isPlaying]);
};
