import { useRef, useEffect } from "react";

import { useElementStore } from "../stores";
import { BindElementHook } from "../types";

export const useBindElement: BindElementHook = (id, elementInfo) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const { callback, ...rest } = elementInfo;

    useElementStore.getState().bind(id, {
      ...rest,
      callback: (state) => {
        if (isMountedRef.current) {
          callback(state);
        }
      },
    });

    return () => {
      isMountedRef.current = false;
      useElementStore.getState().unbind(id);
    };
  }, [id, elementInfo]);
};
