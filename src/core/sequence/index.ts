import { ElementGroupMeta, ElementInfo } from "../controller";
import {
  getRandomElements,
  getReversedElementGroup,
  groupElementsByAngle,
  groupElementsByAxis,
  groupElementsByDistance,
} from "./utils";

export type SequencePreset = {
  key: string;
  data: (elements: ElementInfo[]) => ElementGroupMeta;
};

export const sequencePresets: SequencePreset[] = [
  {
    key: "flow",
    data: (elements) => {
      const groups = groupElementsByAxis(elements, "x");
      return { type: "static", groups };
    },
  },
  {
    key: "reverse_flow",
    data: (elements) => {
      const groups = groupElementsByAxis(elements, "x");
      const revGroups = getReversedElementGroup(groups);

      groups.pop();
      revGroups.pop();

      return { type: "static", groups: [...groups, ...revGroups] };
    },
  },
  {
    key: "spread",
    data: (elements) => {
      const groups = groupElementsByDistance(elements);
      return { type: "static", groups };
    },
  },
  {
    key: "rotate",
    data: (elements) => {
      const groups = groupElementsByAngle(elements);
      return { type: "static", groups };
    },
  },
  {
    key: "flash",
    data: (elements) => {
      const getGroups = () => [
        getRandomElements(elements, Math.round(elements.length / 4)),
      ];
      return { type: "dynamic", groups: getGroups };
    },
  },
  {
    key: "flick",
    data: (elements) => {
      return { type: "static", groups: [elements] };
    },
  },
];
