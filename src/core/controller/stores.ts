import { create } from "zustand";

import { ControllerStore, ElementStore } from "./types";
import {
  getElementExtraStates,
  getTempoSetting,
  getColorSetting,
  getRepeaterSetting,
  mergeSettings,
  mergeState,
} from "./utils";

export const useElementStore = create<ElementStore>((set) => ({
  elementMap: new Map(),
  elementList: [],
  sequenceMap: {},
  bind: (id, elementInfo) =>
    set((state) => {
      const elementMap = new Map(state.elementMap).set(id, elementInfo);
      return mergeState(state, { elementMap });
    }),
  unbind: (id) =>
    set((state) => {
      const elementMap = new Map(state.elementMap);
      elementMap.delete(id);
      return mergeState(state, { elementMap });
    }),
  generate: () =>
    set((state) => {
      return mergeState(state, getElementExtraStates(state.elementMap));
    }),
}));

export const useControllerStore = create<ControllerStore>((set) => ({
  playing: false,
  sequence: "flow",
  settings: {
    ...getTempoSetting(170),
    ...getColorSetting("gradient", ["#0000ff", "#800080", "#0000ff"]),
    ...getRepeaterSetting("static", 1),
  },
  start: () => set((state) => mergeState(state, { playing: true })),
  stop: () => set((state) => mergeState(state, { playing: false })),
  updateSequence: (sequence) => set((state) => mergeState(state, { sequence })),
  updateSettings: (settings) => set((state) => mergeSettings(state, settings)),
  updateTempo: (tempo) =>
    set((state) => mergeSettings(state, getTempoSetting(tempo))),
  updateColor: ({ mode, data }) =>
    set((state) => {
      const { color } = state.settings;
      return mergeSettings(state, getColorSetting(mode, data, color));
    }),
  updateRepeater: ({ mode, data }) =>
    set((state) => {
      const { repeater } = state.settings;
      return mergeSettings(state, getRepeaterSetting(mode, data, repeater));
    }),
}));
