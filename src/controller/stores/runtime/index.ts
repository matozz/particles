import { create } from "zustand";
import type { AnimationFrame, RuntimeStore } from "./types";

const initialRuntimeStore: RuntimeStore = {
  beats: 1,
  beatsToSkip: 0,
  animationFrames: [],
};

export const useRuntimeStore = create<RuntimeStore>(() => ({
  ...initialRuntimeStore,
}));

export const updateBeatsToSkip = (beats: number) => {
  useRuntimeStore.setState({ beatsToSkip: beats });
};

export const addAnimationFrame = (frame: AnimationFrame) => {
  const { animationFrames } = useRuntimeStore.getState();
  const newFrames = [...animationFrames, frame];
  useRuntimeStore.setState({ animationFrames: newFrames });
};

export const incrementBeats = (batch = 1) => {
  const { beats } = useRuntimeStore.getState();
  useRuntimeStore.setState({ beats: beats + batch });
};

export const resetRuntime = () => {
  const { animationFrames } = useRuntimeStore.getState();

  for (const frame of animationFrames) {
    if (frame.type === "raf") {
      cancelAnimationFrame(frame.rafId);
    } else {
      clearTimeout(frame.timerId);
    }
  }
  useRuntimeStore.setState({ ...initialRuntimeStore });
};
