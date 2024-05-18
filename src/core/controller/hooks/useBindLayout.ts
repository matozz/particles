import { useEffect } from "react";

import { useElementStore } from "../stores";

type BindLayoutHook = (layoutId: string, count: number) => void;

export const useBindLayout: BindLayoutHook = (id, count) => {
  const elementMap = useElementStore((state) => state.elementMap);

  useEffect(() => {
    if (elementMap?.size === count) {
      useElementStore.getState().generate();
    }
  }, [id, count, elementMap]);
};
