import { FC, memo, useId, useMemo } from "react";

import { motion, useAnimation } from "framer-motion";

import { ElementInfo, useBindElement } from "@/core/controller";

import { BaseElementProps } from "../types";

import "./index.css";

const SquareElement: FC<BaseElementProps> = memo((props) => {
  const { x, y } = props;

  const controls = useAnimation();

  const id = useId();

  const elementInfo = useMemo<ElementInfo>(
    () => ({
      x,
      y,
      callback: ({ tempo }) => {
        const duration = Number((60 / tempo).toFixed(3));
        controls.start({
          opacity: [0, 1, 1, 0],
          transition: { duration, ease: [0, 1, 0.6, 1] },
        });
      },
    }),
    [x, y],
  );

  useBindElement(id, elementInfo);

  return (
    <div className="square-element relative flex h-8 w-8 items-center justify-center rounded-full p-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="square-color flex items-center justify-center text-xs"
      />
      {/* <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">{`${x},${y}`}</div> */}
    </div>
  );
});

export default SquareElement;
