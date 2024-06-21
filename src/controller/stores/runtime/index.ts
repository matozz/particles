import { create } from "zustand";

import { AnimationFrame, RuntimeStore } from "./types";

const initialRuntimeStore: RuntimeStore = {
  beats: 1,
  beatsToSkip: 0,
  animationFrames: [],
};

export const useRuntimeStore = create<RuntimeStore>(() => ({
  ...initialRuntimeStore,
}));

export const setBeatsToSkip = (beats: number) => {
  useRuntimeStore.setState({ beatsToSkip: beats });
};

export const appendAnimationFrame = (frame: AnimationFrame) => {
  const { animationFrames } = useRuntimeStore.getState();
  const newFrames = [...animationFrames, frame];
  useRuntimeStore.setState({ animationFrames: newFrames });
};

export const runtimeTick = (batch = 1) => {
  const { beats } = useRuntimeStore.getState();
  useRuntimeStore.setState({ beats: beats + batch });
};

export const runtimeReset = () => {
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
