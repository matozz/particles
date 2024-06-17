import { useControllerStore } from "../stores/controller";
import { ElementActionGroup, ElementSequence } from "../stores/element/types";
import { setBeatsToSkip, useRuntimeStore } from "../stores/runtime";
import { getRepeatGroups, getStaticGroups } from "../utils/repeat_helper";

export const handleRepeat = (
  sequence: ElementSequence,
): ElementActionGroup[] => {
  const { settings } = useControllerStore.getState();
  const { beats } = useRuntimeStore.getState();

  const { repeat } = settings;

  if (repeat >= 2) {
    return getRepeatGroups(sequence, beats, repeat);
  }

  if (repeat > 0 && repeat < 1) {
    const { beatsToSkip } = useRuntimeStore.getState();

    if (beatsToSkip === 0) {
      setBeatsToSkip(1 / repeat - 1);
    } else {
      setBeatsToSkip(beatsToSkip - 1);
      return [];
    }
  }

  return getStaticGroups(sequence, beats);
};
