import { create } from "zustand";

import { ControllerStore } from "../types";
import {
  getExtraSetting,
  getTempoSetting,
  mergeSettings,
  mergeState,
} from "./utils";

export const useControllerStore = create<ControllerStore>((set) => ({
  playing: false,
  sequence: { type: "flow", options: { density: 0.25 } },
  settings: {
    repeat: 1,
    step: -1,
    ...getTempoSetting(170),
    ...getExtraSetting("color", {
      mode: "gradient",
      data: ["#0000ff", "#800080", "#0000ff"],
    }),
  },
  start: () => set((state) => mergeState(state, { playing: true })),
  stop: () => set((state) => mergeState(state, { playing: false })),
  updateSequence: (sequence) => set((state) => mergeState(state, { sequence })),
  updateSettings: (settings) => set((state) => mergeSettings(state, settings)),
  updateRepeat: (repeat) => set((state) => mergeSettings(state, { repeat })),
  updateStep: (step) => set((state) => mergeSettings(state, { step })),
  updateTempo: (tempo) =>
    set((state) => mergeSettings(state, getTempoSetting(tempo))),
  updateColor: ({ mode, data }) =>
    set((state) => {
      const { color: fallback } = state.settings;
      return mergeSettings(
        state,
        getExtraSetting("color", { mode, data, fallback }),
      );
    }),
}));
