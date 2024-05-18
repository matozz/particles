import { useRef, useEffect } from "react";

import { useElementStore } from "../stores";
import { ElementBindData } from "../types";

type BindElementHook = (
  elementId: string,
  elementInfo: ElementBindData,
) => void;

export const useBindElement: BindElementHook = (id, elementInfo) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const { callback, ...rest } = elementInfo;

    useElementStore.getState().bind(id, {
      ...rest,
      id,
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
