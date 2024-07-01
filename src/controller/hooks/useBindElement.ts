import { useRef, useEffect } from "react";
import { bindElementToLayout, unbindElementToLayout } from "../stores/element";
import type { ElementBase, ElementCallback } from "../stores/element/types";

type BindElementHook = (
  layoutId: string,
  elementId: string,
  element: ElementBase,
) => void;

export const useBindElement: BindElementHook = (
  layoutId,
  elementId,
  element,
) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const { callback, ...rest } = element;

    const elementCallback: ElementCallback = (state) => {
      if (isMountedRef.current) {
        callback(state);
      }
    };

    bindElementToLayout(layoutId, elementId, {
      ...rest,
      id: elementId,
      callback: elementCallback,
    });

    return () => {
      isMountedRef.current = false;
      unbindElementToLayout(layoutId, elementId);
    };
  }, [layoutId, elementId, element]);
};
