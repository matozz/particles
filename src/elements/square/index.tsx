import { FC, memo, useId, useMemo } from "react";

import { motion, useAnimation } from "framer-motion";

import { ElementInfo, useBindElement } from "@/core/controller";

import { BaseElementProps } from "../types";

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
          scale: [2, 1],
          transition: { duration, ease: [0, 1, 0.6, 1] },
        });
      },
    }),
    [x, y],
  );

  useBindElement(id, elementInfo);

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={controls}
      className="rounded-mdp-2 flex h-12 w-12 items-center justify-center text-3xl"
    >
      {/* {`[${x},${y}]`} */}
      💡
    </motion.div>
  );
});

export default SquareElement;
