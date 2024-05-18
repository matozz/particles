import {
  useControllerStore,
  useElementStore,
  useRuntimeStore,
} from "../stores";
import {
  getAutoTransition,
  getBatchDuration,
  triggerAction,
} from "../utils/tick_helper";
import { handleColor } from "./handle_color";
import { handleRepeat } from "./handle_repeat";

export const handleTick = () => {
  const settings = useControllerStore.getState().settings;
  const sequence = useControllerStore.getState().sequence;
  const presetMap = useElementStore.getState().presetMap;

  const { repeat } = settings;

  const tick = useRuntimeStore.getState().tick;
  const addTimeout = useRuntimeStore.getState().addTimeout;

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

  const autoTransition = getAutoTransition(settings);
  const batchDuration = getBatchDuration(settings, actionGroups.length);

  // TODO: Reschedule the unexecuted actions when tempo changed during excuting a actions group
  // labels: optimization
  for (const [i, action] of actionGroups.entries()) {
    if (i === 0) {
      triggerAction(action, { transition: autoTransition });
    } else {
      const timeout = setTimeout(() => {
        triggerAction(action, { transition: autoTransition });
      }, batchDuration * i);

      addTimeout(timeout);
    }
  }
};
