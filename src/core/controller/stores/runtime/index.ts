import { create } from "zustand";

import { RuntimeStore } from "./types";

const initRuntimeState: Pick<
  RuntimeStore,
  "position" | "skipCount" | "activeFrames"
> = {
  position: 1,
  skipCount: 0,
  activeFrames: [],
};

export const useRuntimeStore = create<RuntimeStore>((set) => ({
  ...initRuntimeState,
  setSkipCount: (skipCount) => set({ skipCount }),
  createActiveFrame: (frame) =>
    set((state) => ({ activeFrames: [...state.activeFrames, frame] })),
  tick: (repeat = 1) => set((state) => ({ position: state.position + repeat })),
  reset: () =>
    set((state) => {
      for (const frame of state.activeFrames) {
        if (frame.type === "raf") {
          cancelAnimationFrame(frame.rafId);
        } else {
          clearTimeout(frame.timerId);
        }
      }
      return { ...initRuntimeState };
    }),
}));
