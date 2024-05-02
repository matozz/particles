import { useEffect, useRef } from "react";

import { useScheduler } from "../scheduler";
import { useControllerStore, useElementStore } from "./stores";
import { BindElementHook } from "./types";

export const useController = () => {
  const playing = useControllerStore((state) => state.playing);
  const sequence = useControllerStore((state) => state.sequence);
  const settings = useControllerStore((state) => state.settings);
  const elementGroupMap = useElementStore((state) => state.elementGroupMap);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const { start, stop } = useScheduler(settings.interval, {
    onTick: () => {
      if (!elementGroupMap[sequence]) {
        return;
      }

      const { type, groups } = elementGroupMap[sequence];

      const elementGroup = type === "static" ? groups : groups();
      const tick = settings.interval / elementGroup.length;

      // TODO: Reschedule the unexecuted actions when tempo changed during excuting a actions group.
      for (const [i, elements] of elementGroup.entries()) {
        if (i === 0) {
          for (const element of elements) {
            element.callback(settings);
          }
        } else {
          const timeout = setTimeout(() => {
            for (const element of elements) {
              element.callback(settings);
            }
          }, tick * i);

          timeoutsRef.current.push(timeout);
        }
      }
    },
  });

  useEffect(() => {
    if (playing) {
      start();
    } else {
      stop();

      for (const id of timeoutsRef.current) {
        clearTimeout(id);
      }
      timeoutsRef.current = [];
    }
  }, [playing]);
};

export const useBindElement: BindElementHook = (id, elementInfo) => {
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
