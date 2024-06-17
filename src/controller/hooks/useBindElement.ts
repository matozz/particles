import { useRef, useEffect } from "react";

import { bindElement, unbindElement } from "../stores/element";
import { ElementBind, ElementBindCallback } from "../stores/element/types";

type BindElementHook = (
  layoutId: string,
  elementId: string,
  elementInfo: ElementBind,
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

    const elementCallback: ElementBindCallback = (state) => {
      if (isMountedRef.current) {
        callback(state);
      }
    };

    bindElement(layoutId, elementId, {
      ...rest,
      id: elementId,
      callback: elementCallback,
    });

    return () => {
      isMountedRef.current = false;
      unbindElement(layoutId, elementId);
    };
  }, [layoutId, elementId, elementInfo]);
};
