import { type FC, memo, useId } from "react";
import { motion } from "framer-motion";
import { useBindElementWithAnimation } from "@/controller";
import type { BaseElementProps } from "../types";

const SpotlightElement: FC<BaseElementProps> = memo((props) => {
  const { layoutId, x, y, isDev } = props;

  const elementId = useId();

  const controls = useBindElementWithAnimation(layoutId, elementId, { x, y });

  return (
    <div className="shadow-light relative flex h-8 w-8 items-center justify-center rounded-full bg-[#111] p-2">
      <motion.div
        animate={controls}
        className="absolute inset-0 box-border flex h-full w-full items-center justify-center rounded-full text-xs text-black"
      />
      {isDev && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">{`${Math.round(x)},${Math.round(y)}`}</div>
      )}
    </div>
  );
});

export default SpotlightElement;
