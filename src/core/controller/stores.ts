import { create } from "zustand";

import { ControllerStore, ElementStore, PluginStore } from "./types";
import {
  getElementExtraStates,
  getTempoSetting,
  getColorSetting,
  getRepeaterSetting,
  getStepperSetting,
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
  plugins: ["color", "repeater", "stepper"],
  settings: {
    ...getTempoSetting(170),
    ...getColorSetting("gradient", ["#0000ff", "#800080", "#0000ff"]),
    ...getRepeaterSetting("static", 1),
    ...getStepperSetting("none"),
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
  updateStepper: ({ mode, data }) =>
    set((state) => {
      const { stepper } = state.settings;
      return mergeSettings(state, getStepperSetting(mode, data, stepper));
    }),
  updatePlugins: (plugins) => set((state) => mergeState(state, { plugins })),
}));

export const usePluginStore = create<PluginStore>((set) => ({
  position: 1,
  skipCount: 0,
  setSkipCount: (skipCount) => set((state) => mergeState(state, { skipCount })),
  skip: () =>
    set((state) => mergeState(state, { skipCount: state.skipCount - 1 })),
  tick: () =>
    set((state) => mergeState(state, { position: state.position + 1 })),
  reset: () => set((state) => mergeState(state, { position: 1, skipCount: 0 })),
}));
