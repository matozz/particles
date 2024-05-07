import { ElementSequence, ElementInfo } from "@/core/controller";

import {
  getActionGroups,
  getRandomElements,
  getReversedElementGroup,
  groupElementsByAngle,
  groupElementsByAxis,
  groupElementsByDistance,
} from "./utils";

export type SequencePreset = {
  data: (elements: ElementInfo[], reverse?: boolean) => ElementSequence;
};

export const sequencePresets: Record<string, SequencePreset> = {
  flow: {
    data: (elements, reverse) => {
      const groups = groupElementsByAxis(elements, reverse ? "y" : "x");
      return { type: "static", groups: getActionGroups(groups) };
    },
  },
  reverse_flow: {
    data: (elements, reverse) => {
      const groups = groupElementsByAxis(elements, reverse ? "y" : "x");
      const revGroups = getReversedElementGroup(groups);

      // groups.pop();
      // revGroups.pop();

      return {
        type: "static",
        groups: getActionGroups([...groups, ...revGroups]),
      };
    },
  },
  spread: {
    data: (elements) => {
      const groups = groupElementsByDistance(elements);
      return { type: "static", groups: getActionGroups(groups) };
    },
  },
  rotate: {
    data: (elements) => {
      const groups = groupElementsByAngle(elements);
      return { type: "static", groups: getActionGroups(groups) };
    },
  },
  flash: {
    data: (elements) => {
      const getGroups = () =>
        getActionGroups([
          getRandomElements(elements, Math.round(elements.length / 4)),
        ]);
      return { type: "dynamic", groups: getGroups };
    },
  },
  flick: {
    data: (elements) => {
      return { type: "static", groups: getActionGroups([elements]) };
    },
  },
};
