import { create } from "zustand";

import { RuntimeStore } from "../types";
import { mergeState } from "../utils/store_common";

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
  setSkipCount: (skipCount) => set((state) => mergeState(state, { skipCount })),
  createActiveFrame: (frame) =>
    set((state) =>
      mergeState(state, {
        activeFrames: [...state.activeFrames, frame],
      }),
    ),
  tick: (repeat = 1) =>
    set((state) => mergeState(state, { position: state.position + repeat })),
  reset: () =>
    set((state) => {
      for (const frame of state.activeFrames) {
        if (frame.type === "raf") {
          cancelAnimationFrame(frame.rafId);
        } else {
          clearTimeout(frame.timerId);
        }
      }
      return mergeState(state, initRuntimeState);
    }),
}));
