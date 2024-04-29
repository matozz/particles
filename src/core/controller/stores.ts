import { create } from "zustand";

import { SequenceList } from "../sequences";
import {
  ControllerStore,
  ElementInfo,
  ElementGroupMap,
  ElementStore,
} from "./types";

const processElements = (elementMap: Map<string, ElementInfo>) => {
  const elementList = Array.from(elementMap.values());

  const elementGroupMap = SequenceList.reduce<ElementGroupMap>((acc, cur) => {
    const { type, data } = cur;
    acc[type] = data(elementList);
    return acc;
  }, {});

  return { elementList, elementGroupMap };
};

export const useElementStore = create<ElementStore>((set) => ({
  elementMap: new Map(),
  elementList: [],
  elementGroupMap: {},
  bind: (id, elementInfo) =>
    set((state) => {
      const elementMap = new Map(state.elementMap).set(id, elementInfo);
      return { elementMap, ...processElements(elementMap) };
    }),
  unbind: (id) =>
    set((state) => {
      const elementMap = new Map(state.elementMap);
      elementMap.delete(id);
      return { elementMap, ...processElements(elementMap) };
    }),
}));

export const useControllerStore = create<ControllerStore>((set) => ({
  playing: false,
  settings: {
    interval: 500,
    tempo: 120,
  },
  start: () => set((state) => ({ ...state, playing: true })),
  stop: () => set((state) => ({ ...state, playing: false })),
  updateSettings: (settings) =>
    set((state) => ({
      ...state,
      settings: { ...state.settings, ...settings },
    })),
  updateTempo: (tempo) =>
    set((state) => ({
      ...state,
      settings: {
        ...state.settings,
        tempo,
        interval: (60 / tempo) * 1000,
      },
    })),
}));