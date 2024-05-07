import { useEffect } from "react";

import { useElementStore } from "../stores";
import { BindLayoutHook } from "../types";

export const useBindLayout: BindLayoutHook = (id, count) => {
  const elementMap = useElementStore((state) => state.elementMap);

  useEffect(() => {
    if (elementMap?.size === count) {
      console.log("generating new elements...", elementMap);
      useElementStore.getState().generate();
    }
  }, [id, count, elementMap]);
};
