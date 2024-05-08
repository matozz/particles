import { create } from "zustand";

import { RuntimeStore } from "../types";
import { mergeState } from "./utils";

export const useRuntimeStore = create<RuntimeStore>((set) => ({
  position: 1,
  skipCount: 0,
  timeouts: [],
  setSkipCount: (skipCount) => set((state) => mergeState(state, { skipCount })),
  addTimeout: (timeout) =>
    set((state) =>
      mergeState(state, { timeouts: [...state.timeouts, timeout] }),
    ),
  tick: (repeat = 1) =>
    set((state) => mergeState(state, { position: state.position + repeat })),
  reset: () =>
    set((state) => {
      for (const id of state.timeouts) {
        clearTimeout(id);
      }
      return mergeState(state, { position: 1, skipCount: 0, timeouts: [] });
    }),
}));
