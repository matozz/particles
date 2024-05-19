import { create } from "zustand";

import { LayoutDirection } from "../constant";
import { ControllerStore } from "../types";
import { mergeState } from "../utils/store_common";
import {
  getTempoSetting,
  getExtraSetting,
  mergeSettings,
} from "../utils/store_controller";

const initControllerState: Pick<ControllerStore, "sequence" | "settings"> = {
  sequence: { type: "flow", options: { density: 0.25 } },
  settings: {
    repeat: 1,
    ...getTempoSetting(128),
    ...getExtraSetting("color", {
      mode: "gradient-layout",
      data: {
        direction: LayoutDirection.TopToBottom,
        colors: ["#0000ff", "#800080", "#0000ff"],
      },
    }),
  },
};

export const useControllerStore = create<ControllerStore>((set) => ({
  playing: false,
  triggerMode: "raf",
  ...initControllerState,
  start: () => set((state) => mergeState(state, { playing: true })),
  stop: () => set((state) => mergeState(state, { playing: false })),
  updateSequence: (sequence) => set((state) => mergeState(state, { sequence })),
  updateSettings: (settings) => set((state) => mergeSettings(state, settings)),
  updateRepeat: (repeat) => set((state) => mergeSettings(state, { repeat })),
  updateTempo: (tempo) =>
    set((state) => mergeSettings(state, getTempoSetting(tempo))),
  updateColor: ({ mode, data }) =>
    set((state) => {
      const { color } = state.settings;
      return mergeSettings(
        state,
        getExtraSetting("color", {
          mode: mode || color.mode,
          data: data || color.data,
        }),
      );
    }),
}));
