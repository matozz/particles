import { useControllerStore } from "../stores/controller";
import type { ElementChain, ElementSequence } from "../stores/element/types";
import { updateBeatsToSkip, useRuntimeStore } from "../stores/runtime";
import { getRepeatedActions, getDefaultActions } from "../utils/repeat_helper";

export const handleRepeat = (sequence: ElementSequence): ElementChain => {
  const { settings } = useControllerStore.getState();
  const { beats } = useRuntimeStore.getState();

  const { repeat } = settings;

  if (repeat >= 2) {
    return getRepeatedActions(sequence, beats, repeat);
  }

  if (repeat > 0 && repeat < 1) {
    const { beatsToSkip } = useRuntimeStore.getState();

    if (beatsToSkip === 0) {
      updateBeatsToSkip(1 / repeat - 1);
    } else {
      updateBeatsToSkip(beatsToSkip - 1);
      return { actions: [] };
    }
  }

  return getDefaultActions(sequence, beats);
};
