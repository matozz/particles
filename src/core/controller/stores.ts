import { create } from "zustand";

import { ControllerStore, ElementStore } from "./types";
import { getElementExtraStates, getTempoState } from "./utils";

export const useElementStore = create<ElementStore>((set) => ({
  elementMap: new Map(),
  elementList: [],
  elementGroupMap: {},
  bind: (id, elementInfo) =>
    set((state) => {
      const elementMap = new Map(state.elementMap).set(id, elementInfo);
      return { ...state, elementMap };
    }),
  unbind: (id) =>
    set((state) => {
      const elementMap = new Map(state.elementMap);
      elementMap.delete(id);
      return { ...state, elementMap };
    }),
  generate: () =>
    set((state) => {
      return { ...state, ...getElementExtraStates(state.elementMap) };
    }),
}));

export const useControllerStore = create<ControllerStore>((set) => ({
  playing: false,
  sequence: "flow",
  settings: getTempoState(120),
  start: () => set((state) => ({ ...state, playing: true })),
  stop: () => set((state) => ({ ...state, playing: false })),
  updateSequence: (sequence) => set((state) => ({ ...state, sequence })),
  updateSettings: (settings) =>
    set((state) => ({
      ...state,
      settings: { ...state.settings, ...settings },
    })),
  updateTempo: (tempo) =>
    set((state) => ({
      ...state,
      settings: { ...state.settings, ...getTempoState(tempo) },
    })),
}));
