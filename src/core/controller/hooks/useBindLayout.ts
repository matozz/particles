import { useEffect } from "react";

import { useElementStore } from "../stores";

type BindLayoutHook = (layoutId: string, count: number) => void;

export const useBindLayout: BindLayoutHook = (layoutId, count) => {
  const elementMap = useElementStore((state) => state.elementMap);

  useEffect(() => {
    const layoutElementMap = elementMap.get(layoutId);
    if (layoutElementMap && layoutElementMap.size === count) {
      useElementStore.getState().generate(layoutId);
    }
  }, [layoutId, count, elementMap]);
};
