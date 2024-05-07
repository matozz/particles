import { useControllerStore, useRuntimeStore } from "../stores";
import { ElementActionGroups, ElementSequence } from "../types";
import { expandGroups } from "./utils";

export const handleRepeat = (
  sequence: ElementSequence,
): ElementActionGroups => {
  const settings = useControllerStore.getState().settings;
  const { repeat } = settings;

  const { type, groups } = sequence;

  if (repeat >= 2) {
    return expandGroups(groups, repeat);
  }

  if (repeat > 0 && repeat < 1) {
    const skipCount = useRuntimeStore.getState().skipCount;
    const setSkipCount = useRuntimeStore.getState().setSkipCount;

    if (skipCount === 0) {
      setSkipCount(1 / repeat - 1);
    } else {
      setSkipCount(skipCount - 1);
      return [];
    }
  }

  return type === "static" ? groups : groups();
};
