import { useControllerStore, useRuntimeStore } from "../stores";
import { ElementActionGroup } from "../types";
import { getActiveIndex, getActiveIndexList } from "./utils";

const getGroups = (
  actionGroups: ElementActionGroup[],
  step: number,
  position: number,
) => {
  if (step === 0) {
    const idx = getActiveIndex(position, actionGroups.length);
    return [actionGroups[idx]];
  } else {
    const idxes = getActiveIndexList(position, actionGroups.length, step);
    return actionGroups.reduce<ElementActionGroup[]>((acc, cur, i) => {
      if (idxes.includes(i)) {
        acc.push(cur);
      }
      return acc;
    }, []);
  }
};

export const handleStep = (
  actionGroups: ElementActionGroup[],
): ElementActionGroup[] => {
  const settings = useControllerStore.getState().settings;
  const { repeat, step } = settings;

  if (step < 0) {
    return actionGroups;
  }

  const position = useRuntimeStore.getState().position;

  if (repeat >= 2) {
    const orgActionGroups = actionGroups.slice(0, actionGroups.length / repeat);

    let groups: ElementActionGroup[] = [];
    for (let i = 0; i < repeat; i++) {
      groups = groups.concat(getGroups(orgActionGroups, step, position + i));
    }
    return groups;
  }

  return getGroups(actionGroups, step, position);
};
