import {
  useControllerStore,
  useElementStore,
  useRuntimeStore,
} from "../stores";
import { ElementBaseState } from "../types";
import { handleColor } from "./handleColor";
import { handleRepeat } from "./handleRepeat";
import { handleStep } from "./handleStep";
import { getAutoTransition, getBatchDuration } from "./utils";

export const handleTick = () => {
  const settings = useControllerStore.getState().settings;
  const sequence = useControllerStore.getState().sequence;
  const sequenceMap = useElementStore.getState().sequenceMap;

  const { repeat } = settings;

  const tick = useRuntimeStore.getState().tick;
  const addTimeout = useRuntimeStore.getState().addTimeout;

  if (!sequenceMap[sequence.type]) {
    return;
  }

  // TODO: Sample element groups with excessively short trigger
  // labels: optimization
  let actionGroups = handleRepeat(sequenceMap[sequence.type]);
  actionGroups = handleStep(actionGroups);
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
    const state: ElementBaseState = {
      transition: action.transition || autoTransition,
      color: action.color,
    };

    if (i === 0) {
      for (const element of action.groups) {
        element.callback(state);
      }
    } else {
      const timeout = setTimeout(() => {
        for (const element of action.groups) {
          element.callback(state);
        }
      }, batchDuration * i);

      addTimeout(timeout);
    }
  }
};
