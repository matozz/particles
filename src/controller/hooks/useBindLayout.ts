import { useEffect } from "react";
import { generateLayoutMappings, useElementStore } from "../stores/element";

type BindLayoutHook = (layoutId: string, count: number) => void;

export const useBindLayout: BindLayoutHook = (layoutId, count) => {
  const elementMap = useElementStore((state) => state.elementMap);

  useEffect(() => {
    const layoutElementMap = elementMap.get(layoutId);
    if (layoutElementMap && layoutElementMap.size === count) {
      generateLayoutMappings(layoutId);
    }
  }, [layoutId, count, elementMap]);
};
