import { create } from "zustand";

import { ElementInfo, ElementStore } from "../types";
import { mergeState } from "../utils/store_common";
import { getGenerateStates } from "../utils/store_element";
import { useControllerStore } from "./ControllerStore";

const initElementState: Pick<ElementStore, "presetMap" | "layoutMap"> = {
  presetMap: undefined,
  layoutMap: undefined,
};

export const useElementStore = create<ElementStore>((set) => ({
  elementMap: new Map(),
  ...initElementState,
  bind: (layoutId, elementId, elementInfo) =>
    set((state) => {
      const updatedOuterMap = new Map(state.elementMap);
      if (updatedOuterMap.has(layoutId)) {
        const innerMap = new Map(updatedOuterMap.get(layoutId));
        innerMap.set(elementId, elementInfo);
        updatedOuterMap.set(layoutId, innerMap);
      } else {
        const newInnerMap = new Map<string, ElementInfo>().set(
          elementId,
          elementInfo,
        );
        updatedOuterMap.set(layoutId, newInnerMap);
      }
      return mergeState(state, { elementMap: updatedOuterMap });
    }),
  unbind: (layoutId, elementId) =>
    set((state) => {
      if (!state.elementMap.has(layoutId)) {
        return state;
      }
      const updatedOuterMap = new Map(state.elementMap);
      const innerMap = new Map(updatedOuterMap.get(layoutId));

      innerMap.delete(elementId);

      if (innerMap.size === 0) {
        updatedOuterMap.delete(layoutId);
      } else {
        updatedOuterMap.set(layoutId, innerMap);
      }
      return mergeState(state, { elementMap: updatedOuterMap });
    }),
  generate: (layoutId) =>
    set((state) => {
      const { options } = useControllerStore.getState().sequence;
      const layoutElementMap = state.elementMap.get(layoutId);

      if (!layoutElementMap) {
        return state;
      }
      return mergeState(state, getGenerateStates(layoutElementMap, options));
    }),
}));
