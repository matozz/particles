import type { ElementSequenceAddon, PresetOptions } from "../sequence/types";
import type {
  ElementAction,
  ElementChain,
  ElementGroup,
  ElementSequence,
} from "../stores/element/types";

export const applyChainAddons = (
  actions: ElementAction[],
  addons: ElementSequenceAddon,
) => {
  const result: ElementChain = { actions };
  if (addons.hooks && Object.keys(addons.hooks).length > 0) {
    result.hooks = addons.hooks;
  }
  if (addons.options && Object.keys(addons.options).length > 0) {
    result.options = addons.options;
  }
  return result;
};

export const appendTrailingBlanks = (
  options: PresetOptions | undefined,
  finalGroups: ElementGroup[],
  len?: number,
) => {
  const { trailingBlanksN } = options || {};

  if (trailingBlanksN) {
    const trailings = Math.floor((len || finalGroups.length) * trailingBlanksN);
    for (let i = 0; i < trailings; i++) {
      finalGroups.push([]);
    }
  }
};

const calculateRepeatIndex = (beats: number, repeat: number, len: number) =>
  (((beats - 1) % len) + repeat) % len;

export const getRepeatedActions = (
  sequence: ElementSequence,
  beats: number,
  repeat: number,
): ElementChain => {
  const { type, data } = sequence;
  const { hooks, options } = data;

  const finalGroups: ElementGroup[] = [];

  const addGroups = (groups: ElementGroup[], length: number) => {
    groups.forEach((group) => finalGroups.push(group));
    appendTrailingBlanks(options, finalGroups, length);
  };

  if (type === "static") {
    if (data.groups.length > 1) {
      for (let i = 0; i < repeat; i++) {
        const idx = calculateRepeatIndex(beats, i, data.groups.length);
        addGroups(data.groups[idx], data.groups[idx].length);
      }
    } else {
      for (let i = 0; i < repeat; i++) {
        addGroups(data.groups[0], data.groups[0].length);
      }
    }
  } else {
    if (data.groups.length > 1) {
      for (let i = 0; i < repeat; i++) {
        const idx = calculateRepeatIndex(beats, i, data.groups.length);
        const newGroups = data.groups[idx]();
        addGroups(newGroups, newGroups.length);
      }
    } else {
      for (let i = 0; i < repeat; i++) {
        const newGroups = data.groups[0]();
        addGroups(newGroups, newGroups.length);
      }
    }
  }

  const actions: ElementAction[] = finalGroups.map((group) => ({
    group,
    options: {},
  }));

  return applyChainAddons(actions, { hooks, options });
};

export const getDefaultActions = (
  sequence: ElementSequence,
  beats: number,
): ElementChain => {
  const { type, data } = sequence;
  const { hooks, options } = data;

  const groupsLength = data.groups.length;

  let finalGroups: ElementGroup[] = [];

  if (type === "static") {
    if (groupsLength > 1) {
      const idx = (beats - 1) % groupsLength;
      finalGroups = [...data.groups[idx]];
    } else {
      finalGroups = [...data.groups[0]];
    }
  } else {
    if (groupsLength > 1) {
      const idx = (beats - 1) % groupsLength;
      finalGroups = [...data.groups[idx]()];
    } else {
      finalGroups = [...data.groups[0]()];
    }
  }

  // Addon options
  appendTrailingBlanks(options, finalGroups);

  const actions: ElementAction[] = finalGroups.map((group) => ({
    group,
    options: {},
  }));

  return applyChainAddons(actions, { hooks, options });
};

export const filterOriginalActions = (
  actions: ElementAction[],
  repeat: number,
) => actions.slice(0, actions.length / repeat);
