import { useRef, useEffect } from "react";

import { useElementStore } from "../stores/element";
import { ElementBindData } from "../stores/element/types";

type BindElementHook = (
  layoutId: string,
  elementId: string,
  elementInfo: ElementBindData,
) => void;

export const useBindElement: BindElementHook = (
  layoutId,
  elementId,
  elementInfo,
) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const { callback, ...rest } = elementInfo;

    useElementStore.getState().bind(layoutId, elementId, {
      ...rest,
      id: elementId,
      callback: (state) => {
        if (isMountedRef.current) {
          callback(state);
        }
      },
    });

    return () => {
      isMountedRef.current = false;
      useElementStore.getState().unbind(layoutId, elementId);
    };
  }, [layoutId, elementId, elementInfo]);
};
