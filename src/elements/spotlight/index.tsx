import { FC, memo, useId, useMemo } from "react";

import { motion, useAnimation } from "framer-motion";

import { useBindElement } from "@/controller";
import { ElementBind } from "@/controller/stores/element";

import { BaseElementProps } from "../types";

import "./index.css";

const SpotlightElement: FC<BaseElementProps> = memo((props) => {
  const { layoutId, x, y, isDev } = props;

  const controls = useAnimation();

  const elementId = useId();

  const elementInfo = useMemo<ElementBind>(
    () => ({
      x,
      y,
      callback: ({ transition: duration, color, ease }) => {
        controls.start({
          backgroundColor: color,
          transition: { duration: 0 },
        });
        controls.start({
          opacity: [0, 1, 1, 0],
          transition: { duration, ease: ease || [0, 1, 1, 1] },
        });
      },
    }),
    [x, y],
  );

  useBindElement(layoutId, elementId, elementInfo);

  return (
    <div className="spotlight-element relative flex h-8 w-8 items-center justify-center rounded-full bg-[#111] p-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="spotlight-color absolute inset-0 box-border flex h-full w-full items-center justify-center rounded-full text-xs text-white"
      />
      {isDev && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">{`${Math.round(x)},${Math.round(y)}`}</div>
      )}
    </div>
  );
});

export default SpotlightElement;
