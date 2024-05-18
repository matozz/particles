import { create } from "zustand";

import { ElementStore } from "../types";
import { mergeState } from "../utils/store_common";
import { getGenerateStates } from "../utils/store_element";
import { useControllerStore } from "./ControllerStore";

export const useElementStore = create<ElementStore>((set) => ({
  elementMap: new Map(),
  presetMap: undefined,
  layoutMap: undefined,
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
      const { options } = useControllerStore.getState().sequence;
      return mergeState(state, getGenerateStates(state.elementMap, options));
    }),
}));
