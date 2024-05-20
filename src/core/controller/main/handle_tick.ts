import {
  useControllerStore,
  useElementStore,
  useRuntimeStore,
} from "../stores";
import { rafTrigger, stoTrigger } from "../utils/tick_helper";
import { handleColor } from "./handle_color";
import { handleRepeat } from "./handle_repeat";

export const handleTick = () => {
  const triggerMode = useControllerStore.getState().triggerMode;
  const settings = useControllerStore.getState().settings;
  const sequence = useControllerStore.getState().sequence;
  const presetMap = useElementStore.getState().presetMap;

  const { repeat } = settings;

  const tick = useRuntimeStore.getState().tick;
  const createActiveFrame = useRuntimeStore.getState().createActiveFrame;

  if (!presetMap?.[sequence.type]) {
    return;
  }

  // TODO: Sample element groups with excessively short trigger
  // labels: optimization

  let actionGroups = handleRepeat(presetMap[sequence.type]);
  actionGroups = handleColor(actionGroups);

  // skip tick if `actionGroups` is empty
  if (actionGroups.length === 0) {
    return;
  }

  tick(repeat >= 2 ? repeat : 1);

  if (triggerMode === "sto") {
    stoTrigger(settings, actionGroups, (timerId) =>
      createActiveFrame({ type: "sto", timerId }),
    );
  } else {
    rafTrigger(settings, actionGroups, (rafId) =>
      createActiveFrame({ type: "raf", rafId }),
    );
  }
};
