import { useMemo } from "react";
import { type AnimationControls, useAnimation } from "framer-motion";
import type { ElementBase } from "../stores/element/types";
import { useBindElement } from "./useBindElement";

type BindElementAnimationHook = (
  layoutId: string,
  elementId: string,
  element: Pick<ElementBase, "x" | "y">,
) => AnimationControls;

export const useBindElementWithAnimation: BindElementAnimationHook = (
  layoutId,
  elementId,
  element,
) => {
  const { x, y } = element;

  const controls = useAnimation();

  const elementInfo = useMemo<ElementBase>(
    () => ({
      x,
      y,
      callback: ({ transition: duration, color, ease }) => {
        controls.start({
          backgroundColor: [color, "#000000"],
          transition: { duration, ease: ease || [0, 1, 1, 1] },
        });
      },
    }),
    [x, y],
  );

  useBindElement(layoutId, elementId, elementInfo);

  return controls;
};
