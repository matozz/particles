import {
  ControllerSettings,
  ElementActionGroup,
  ElementSequence,
} from "../types";

export const expandGroups = (groups: ElementSequence["groups"], n: number) => {
  const result: ElementActionGroup[] = [];
  if (typeof groups === "function") {
    for (let i = 0; i < n; i++) {
      const newGroups = groups();
      newGroups.forEach((item) => result.push(item));
    }
  } else {
    for (let i = 0; i < n; i++) {
      groups.forEach((item) => result.push(item));
    }
  }
  return result;
};

export const getAutoTransition = (settings: ControllerSettings) => {
  const { interval, repeat } = settings;
  const baseInterval = interval / repeat;
  return Number((baseInterval / 1000).toFixed(3));
};

export const getBatchDuration = (
  settings: ControllerSettings,
  length: number,
) => {
  const { interval, repeat } = settings;
  if (repeat > 1) {
    return interval / length;
  } else {
    return interval / repeat / length;
  }
};

export const getActiveIndex = (position: number, length: number) =>
  (position - 1) % length;

export const getActiveIndexList = (
  position: number,
  length: number,
  gap: number,
) => {
  const list: number[] = [];
  let idx = getActiveIndex(position, length);
  while (idx <= length - 1) {
    list.push(idx);
    idx += gap + 1;
  }
  let idx2 = getActiveIndex(position, length);
  while (idx2 >= 0) {
    if (!list.includes(idx2)) {
      list.push(idx2);
    }
    idx2 -= gap + 1;
  }
  return list.sort((a, b) => a - b);
};