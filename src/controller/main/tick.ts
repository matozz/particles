import { useControllerStore } from "../stores/controller";
import { useElementStore } from "../stores/element";
import { appendAnimationFrame, runtimeTick } from "../stores/runtime";
import { rafTrigger, stoTrigger } from "../utils/tick_helper";
import { handleColor } from "./color";
import { handleRepeat } from "./repeat";

export const handleTick = () => {
  const { triggerMode, settings, sequence } = useControllerStore.getState();
  const { presetMap } = useElementStore.getState();

  const { repeat } = settings;

  if (!presetMap?.[sequence.type]) {
    return;
  }

  // TODO: Sample element groups with excessively short trigger

  let actionGroups = handleRepeat(presetMap[sequence.type]);
  actionGroups = handleColor(actionGroups);

  // skip tick if `actionGroups` is empty
  if (actionGroups.length === 0) {
    return;
  }

  runtimeTick(repeat >= 2 ? repeat : 1);

  if (triggerMode === "sto") {
    stoTrigger(settings, actionGroups, (timerId) =>
      appendAnimationFrame({ type: "sto", timerId }),
    );
  } else {
    rafTrigger(settings, actionGroups, (rafId) =>
      appendAnimationFrame({ type: "raf", rafId }),
    );
  }
};
