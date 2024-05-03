import { useEffect, useRef } from "react";

import { useScheduler } from "../scheduler";
import { useControllerStore, useElementStore } from "./stores";
import { BindElementHook, BindLayoutHook, ElementBaseState } from "./types";

export const useController = () => {
  const playing = useControllerStore((state) => state.playing);
  const settings = useControllerStore((state) => state.settings);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const { start, stop } = useScheduler(settings.interval, {
    onTick: () => {
      const sequence = useControllerStore.getState().sequence;
      const elementGroupMap = useElementStore.getState().elementGroupMap;

      if (!elementGroupMap[sequence]) {
        return;
      }

      const { type, groups } = elementGroupMap[sequence];

      // TODO: Sample element groups with excessively short trigger
      // labels: optimization
      const elementGroup = type === "static" ? groups : groups();
      const tick = settings.interval / elementGroup.length;

      const state: ElementBaseState = { tempo: settings.tempo };

      // TODO: Reschedule the unexecuted actions when tempo changed during excuting a actions group
      // labels: optimization
      for (const [i, elements] of elementGroup.entries()) {
        if (i === 0) {
          for (const element of elements) {
            element.callback(state);
          }
        } else {
          const timeout = setTimeout(() => {
            for (const element of elements) {
              element.callback(state);
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
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const { callback, ...rest } = elementInfo;

    useElementStore.getState().bind(id, {
      ...rest,
      callback: (state) => {
        if (isMountedRef.current) {
          callback(state);
        }
      },
    });

    return () => {
      isMountedRef.current = false;
      useElementStore.getState().unbind(id);
    };
  }, [id, elementInfo]);
};

export const useBindLayout: BindLayoutHook = (id, count) => {
  const elementMap = useElementStore((state) => state.elementMap);

  useEffect(() => {
    if (elementMap?.size === count) {
      console.log("generating new elements...", elementMap);
      useElementStore.getState().generate();
    }
  }, [id, count, elementMap]);
};
