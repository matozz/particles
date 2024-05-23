import { useControllerStore } from "../stores/controller";
import { ElementActionGroup, ElementSequence } from "../stores/element/types";
import { useRuntimeStore } from "../stores/runtime";
import { getRepeatGroups, getStaticGroups } from "../utils/repeat_helper";

export const handleRepeat = (
  sequence: ElementSequence,
): ElementActionGroup[] => {
  const settings = useControllerStore.getState().settings;
  const position = useRuntimeStore.getState().position;

  const { repeat } = settings;

  if (repeat >= 2) {
    return getRepeatGroups(sequence, position, repeat);
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

  return getStaticGroups(sequence, position);
};
