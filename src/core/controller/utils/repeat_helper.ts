import { ElementActionGroup, ElementSequence } from "../stores/element/types";

const getStepRepeatIndex = (
  position: number,
  repeat: number,
  groupLength: number,
) => (((position - 1) % groupLength) + repeat) % groupLength;

export const getRepeatGroups = (
  sequence: ElementSequence,
  position: number,
  repeat: number,
) => {
  const { type, sequence: groups } = sequence;

  const result: ElementActionGroup[] = [];

  if (type === "static") {
    if (groups.length > 1) {
      for (let i = 0; i < repeat; i++) {
        const idx = getStepRepeatIndex(position, i, groups.length);
        groups[idx].forEach((item) => result.push(item));
      }
    } else {
      for (let i = 0; i < repeat; i++) {
        groups[0].forEach((item) => result.push(item));
      }
    }
  } else {
    if (groups.length > 1) {
      for (let i = 0; i < repeat; i++) {
        const idx = getStepRepeatIndex(position, i, groups.length);
        const newGroups = groups[idx]();
        newGroups.forEach((item) => result.push(item));
      }
    } else {
      for (let i = 0; i < repeat; i++) {
        const newGroups = groups[0]();
        newGroups.forEach((item) => result.push(item));
      }
    }
  }

  return result;
};

export const getStaticGroups = (
  sequence: ElementSequence,
  position: number,
) => {
  const { type, sequence: groups } = sequence;

  if (type === "static") {
    if (groups.length > 1) {
      const idx = (position - 1) % groups.length;
      return groups[idx];
    } else {
      return groups[0];
    }
  } else {
    if (groups.length > 1) {
      const idx = (position - 1) % groups.length;
      return groups[idx]();
    } else {
      return groups[0]();
    }
  }
};

export const adjustOriginalActionGroups = (
  groups: ElementActionGroup[],
  repeat: number,
) => groups.slice(0, groups.length / repeat);
