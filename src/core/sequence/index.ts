import { ElementGroupMeta, ElementInfo } from "../controller";
import {
  getRandomElements,
  groupElementsByAngle,
  groupElementsByAxis,
  groupElementsByDistance,
} from "./utils";

type SequenceItem = { key: string; data: SequenceItemData };
type SequenceItemData = (elementList: ElementInfo[]) => ElementGroupMeta;

export const SequenceList: SequenceItem[] = [
  {
    key: "flow",
    data: (elementList: ElementInfo[]) => {
      const groups = groupElementsByAxis(elementList, "x");
      return { type: "static", groups };
    },
  },
  {
    key: "reverse_flow",
    data: (elementList: ElementInfo[]) => {
      const groups = groupElementsByAxis(elementList, "x");

      const revGroups = [...groups].reverse();

      groups.pop();
      revGroups.pop();

      return { type: "static", groups: [...groups, ...revGroups] };
    },
  },
  {
    key: "spread",
    data: (elementList: ElementInfo[]) => {
      const groups = groupElementsByDistance(elementList);
      return { type: "static", groups };
    },
  },
  {
    key: "rotate",
    data: (elementList: ElementInfo[]) => {
      const groups = groupElementsByAngle(elementList);
      return { type: "static", groups };
    },
  },
  {
    key: "flash",
    data: (elementList: ElementInfo[]) => {
      const getGroups = () => [
        getRandomElements(elementList, Math.round(elementList.length / 3)),
      ];
      return { type: "dynamic", groups: getGroups };
    },
  },
];
