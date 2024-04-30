import { useEffect, useRef } from "react";

import { useScheduler } from "../scheduler";
import { useControllerStore, useElementStore } from "./stores";
import { UseBindElementHook } from "./types";

export const useController = () => {
  const playing = useControllerStore((state) => state.playing);
  const sequence = useControllerStore((state) => state.sequence);
  const settings = useControllerStore((state) => state.settings);
  const elementGroupMap = useElementStore((state) => state.elementGroupMap);

  const timerRef = useRef<number>();
  const { start, stop } = useScheduler(settings.interval, {
    onTick: ({ stopRef }) => {
      if (!elementGroupMap[sequence]) {
        return;
      }

      const { type, groups } = elementGroupMap[sequence];

      const elementGroup = type === "static" ? groups : groups();
      const tick = settings.interval / elementGroup.length;

      for (const [i, elements] of elementGroup.entries()) {
        if (i === 0) {
          for (const element of elements) {
            element.callback(settings);
          }
        } else {
          setTimeout(() => {
            if (!stopRef.current) {
              for (const element of elements) {
                element.callback(settings);
              }
            }
          }, tick * i);
        }
      }

      if (!timerRef.current) {
        timerRef.current = Date.now();
        console.log("init tick");
      } else {
        console.log("tick", Date.now() - timerRef.current);
        timerRef.current = Date.now();
      }
    },
  });

  useEffect(() => (playing ? start() : stop()), [playing]);
};

export const useBindElement: UseBindElementHook = (id, elementInfo) => {
  const bind = useElementStore((state) => state.bind);
  const unbind = useElementStore((state) => state.unbind);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const { callback, ...rest } = elementInfo;

    bind(id, {
      ...rest,
      callback: (state) => {
        if (isMountedRef.current) {
          callback(state);
        }
      },
    });

    return () => {
      isMountedRef.current = false;
      unbind(id);
    };
  }, [id, elementInfo, bind, unbind]);
};
