import { ElementSequencePreset } from "../types";
import {
  getActionGroups,
  getRandomElements,
  getReversedElementGroup,
  groupElementsByAngle,
  groupElementsByAxis,
  groupElementsByDistance,
} from "./utils";

export const sequencePresets: Record<string, ElementSequencePreset> = {
  flow: {
    data: (elements, options) => {
      const { direction = "x" } = options || {};
      const groups = groupElementsByAxis(elements, direction);
      return { type: "static", groups: getActionGroups(groups) };
    },
  },
  reverse_flow: {
    data: (elements, options) => {
      const { direction = "x" } = options || {};
      const groups = groupElementsByAxis(elements, direction);
      const revGroups = getReversedElementGroup(groups);
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
    data: (elements, options) => {
      const { density = 0.25 } = options || {};
      const getGroups = () => {
        const num = Math.round(elements.length / (1 / density));
        return getActionGroups([getRandomElements(elements, num)]);
      };
      return { type: "dynamic", groups: getGroups };
    },
  },
  flick: {
    data: (elements) => {
      return { type: "static", groups: getActionGroups([elements]) };
    },
  },
};
