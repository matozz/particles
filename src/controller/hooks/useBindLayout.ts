import { useEffect } from "react";

import { generateLayout, useElementStore } from "../stores/element";

type BindLayoutHook = (layoutId: string, count: number) => void;

export const useBindLayout: BindLayoutHook = (layoutId, count) => {
  const elementMap = useElementStore((state) => state.elementMap);

  useEffect(() => {
    const layoutElementMap = elementMap.get(layoutId);
    if (layoutElementMap && layoutElementMap.size === count) {
      generateLayout(layoutId);
    }
  }, [layoutId, count, elementMap]);
};
