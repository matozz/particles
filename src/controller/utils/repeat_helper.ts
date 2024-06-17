import { PresetHooks } from "../sequence/types";
import { ElementActionGroup, ElementSequence } from "../stores/element/types";

export const applyPresetHooks = (
  groups: ElementActionGroup[],
  hooks: PresetHooks,
) => groups.map((group) => ({ ...group, hooks }));

const getStepRepeatIndex = (
  beats: number,
  repeat: number,
  groupLength: number,
) => (((beats - 1) % groupLength) + repeat) % groupLength;

export const getRepeatGroups = (
  sequence: ElementSequence,
  beats: number,
  repeat: number,
) => {
  const { type, data, hooks } = sequence;

  let groups: ElementActionGroup[] = [];

  if (type === "static") {
    if (data.length > 1) {
      for (let i = 0; i < repeat; i++) {
        const idx = getStepRepeatIndex(beats, i, data.length);
        data[idx].forEach((item) => groups.push(item));
      }
    } else {
      for (let i = 0; i < repeat; i++) {
        data[0].forEach((item) => groups.push(item));
      }
    }
  } else {
    if (data.length > 1) {
      for (let i = 0; i < repeat; i++) {
        const idx = getStepRepeatIndex(beats, i, data.length);
        const newGroups = data[idx]();
        newGroups.forEach((item) => groups.push(item));
      }
    } else {
      for (let i = 0; i < repeat; i++) {
        const newGroups = data[0]();
        newGroups.forEach((item) => groups.push(item));
      }
    }
  }

  if (hooks && Object.keys(hooks).length > 0) {
    groups = applyPresetHooks(groups, hooks);
  }

  return groups;
};

export const getStaticGroups = (sequence: ElementSequence, beats: number) => {
  const { type, data, hooks } = sequence;

  let groups: ElementActionGroup[] = [];

  if (type === "static") {
    if (data.length > 1) {
      const idx = (beats - 1) % data.length;
      groups = data[idx];
    } else {
      groups = data[0];
    }
  } else {
    if (data.length > 1) {
      const idx = (beats - 1) % data.length;
      groups = data[idx]();
    } else {
      groups = data[0]();
    }
  }

  if (hooks && Object.keys(hooks).length > 0) {
    groups = applyPresetHooks(groups, hooks);
  }

  return groups;
};

export const adjustOriginalActionGroups = (
  groups: ElementActionGroup[],
  repeat: number,
) => groups.slice(0, groups.length / repeat);
