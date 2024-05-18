import { LayoutDirection } from "../constant";
import { ElementActionGroup, ElementSequencePreset } from "../types";
import {
  getRandomArr,
  groupArrayByInterval,
  transposeArray,
} from "../utils/array";
import {
  getActionGroups,
  groupElementsByAngle,
  groupElementsByDistance,
} from "../utils/sequence";

export const sequencePresets: Record<string, ElementSequencePreset> = {
  flow: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.LeftToRight];
      return getActionGroups(layout.elementArr);
    },
  },
  flow_step_x_single: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.TopToBottom];
      return layout.elementArr.map((v) => getActionGroups(v.map((v1) => [v1])));
    },
  },
  flow_step_y_single: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.LeftToRight];
      return layout.elementArr.map((v) => getActionGroups(v.map((v1) => [v1])));
    },
  },
  flow_step_y_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.LeftToRight];
      const groups: ElementActionGroup[][] = [];
      const n = 2;

      const intervalArr = groupArrayByInterval(layout.elementArr, n + 1);

      const transposeArr = intervalArr.map((v) => transposeArray(v));

      for (let i = 0; i < transposeArr.length; i++) {
        groups.push(getActionGroups(transposeArr[i]));
      }

      return groups;
    },
  },
  flow_step_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.BottomRightToTopLeft];
      const groups: ElementActionGroup[][] = [];
      const n = 1;

      const intervalArr = groupArrayByInterval(layout.elementArr, n + 1);

      for (let i = 0; i < intervalArr.length; i++) {
        groups.push(getActionGroups(intervalArr[i]));
      }

      return groups;
    },
  },
  reverse_flow: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout1 = layoutMap[LayoutDirection.LeftToRight];
      const layout2 = layoutMap[LayoutDirection.RightToLeft];
      return getActionGroups([...layout1.elementArr, ...layout2.elementArr]);
    },
  },
  spread: {
    type: "static",
    sequence: ({ elements }) => {
      const groups = groupElementsByDistance(elements);
      return getActionGroups(groups);
    },
  },
  rotate: {
    type: "static",
    sequence: ({ elements }) => {
      const groups = groupElementsByAngle(elements);
      return getActionGroups(groups);
    },
  },
  flash: {
    type: "static",
    sequence: ({ elements }) => {
      return getActionGroups([elements]);
    },
  },
  flash_step_y_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.LeftToRight];
      const groups: ElementActionGroup[][] = [];
      const n = 2;

      const intervalArr = groupArrayByInterval(layout.elementArr, n + 1);
      for (let i = 0; i < intervalArr.length; i++) {
        const flatArr = intervalArr[i].flat();
        groups.push(getActionGroups([flatArr]));
      }
      return groups;
    },
  },
  flick: {
    type: "dynamic",
    sequence: ({ elements, options }) => {
      const { density = 0.25 } = options || {};
      const getGroups = () => {
        const num = Math.round(elements.length / (1 / density));
        return getActionGroups([getRandomArr(elements, num)]);
      };
      return getGroups;
    },
  },
};
