import { create } from "zustand";

import { ElementStore } from "../types";
import { mergeState, getElementExtraStates } from "./utils";

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
