import { create } from "zustand";

import { getPresetMap } from "@/controller/sequence/utils";

import { useControllerStore } from "../controller";
import { Element, ElementStore } from "./types";
import { getLayoutMap } from "./utils";

const initialElementStore: ElementStore = {
  presetMap: undefined,
  layoutMap: undefined,
  elementMap: new Map(),
};

export const useElementStore = create<ElementStore>(() => ({
  ...initialElementStore,
}));

export const bindElement = (
  layoutId: string,
  elementId: string,
  elementInfo: Element,
) => {
  const { elementMap } = useElementStore.getState();

  const updatedOuterMap = new Map(elementMap);

  if (updatedOuterMap.has(layoutId)) {
    const innerMap = new Map(updatedOuterMap.get(layoutId));
    innerMap.set(elementId, elementInfo);
    updatedOuterMap.set(layoutId, innerMap);
  } else {
    const newInnerMap = new Map<string, Element>().set(elementId, elementInfo);
    updatedOuterMap.set(layoutId, newInnerMap);
  }

  useElementStore.setState({ elementMap: updatedOuterMap });
};

export const unbindElement = (layoutId: string, elementId: string) => {
  const { elementMap } = useElementStore.getState();

  if (!elementMap.has(layoutId)) {
    return;
  }

  const updatedOuterMap = new Map(elementMap);
  const innerMap = new Map(updatedOuterMap.get(layoutId));

  innerMap.delete(elementId);

  if (innerMap.size === 0) {
    updatedOuterMap.delete(layoutId);
  } else {
    updatedOuterMap.set(layoutId, innerMap);
  }
  useElementStore.setState({ elementMap: updatedOuterMap });
};

export const generateLayout = (layoutId: string) => {
  const { sequence } = useControllerStore.getState();
  const { elementMap } = useElementStore.getState();

  const { options } = sequence;

  const layoutElementMap = elementMap.get(layoutId);

  if (!layoutElementMap) {
    return;
  }

  const elements = Array.from(layoutElementMap.values());

  const layoutMap = getLayoutMap(elements);
  const presetMap = getPresetMap(elements, layoutMap, options);

  console.log("generating new elements...", elementMap);
  console.log("generating new presets...", presetMap);
  console.log("generating new layouts...", layoutMap);

  useElementStore.setState({ layoutMap, presetMap });
};

export * from "./types";
