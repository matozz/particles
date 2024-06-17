import { LayoutDirection } from "../config";
import { ElementActionGroup } from "../stores/element";
import { randomArray, chunkArray, transposeArray } from "../utils/array";
import { ElementSequencePreset } from "./types";
import { createTransformHook, getElementActionGroups } from "./utils";

export const sequencePresets: Record<string, ElementSequencePreset> = {
  flow: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.LeftToRight];
      return getElementActionGroups(layout.elementArr);
    },
  },
  flow_step_x_single: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.TopToBottom];
      return layout.elementArr.map((elements) =>
        getElementActionGroups(elements.map((element) => [element])),
      );
    },
  },
  flow_step_y_single: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.LeftToRight];
      return layout.elementArr.map((elements) =>
        getElementActionGroups(elements.map((element) => [element])),
      );
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 2 }),
    },
  },
  flow_step_y_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.LeftToRight];
      const groups: ElementActionGroup[][] = [];
      const n = 2;

      const intervalArr = chunkArray(layout.elementArr, n + 1);
      const transposeArr = intervalArr.map((v) => transposeArray(v));

      for (let i = 0; i < transposeArr.length; i++) {
        groups.push(getElementActionGroups(transposeArr[i]));
      }
      return groups;
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 2 }),
    },
  },
  flow_step_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.BottomRightToTopLeft];
      const groups: ElementActionGroup[][] = [];
      const n = 1;

      const intervalArr = chunkArray(layout.elementArr, n + 1);

      for (let i = 0; i < intervalArr.length; i++) {
        groups.push(getElementActionGroups(intervalArr[i]));
      }

      return groups;
    },
  },
  reverse_flow: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout1 = layoutMap[LayoutDirection.LeftToRight];
      const layout2 = layoutMap[LayoutDirection.RightToLeft];

      return getElementActionGroups([
        ...layout1.elementArr,
        ...layout2.elementArr,
      ]);
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 0.5 }),
    },
  },
  reverse_step_flow: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout1 = layoutMap[LayoutDirection.LeftToRight];
      const layout2 = layoutMap[LayoutDirection.RightToLeft];

      const groups: ElementActionGroup[][] = [
        getElementActionGroups(layout1.elementArr),
        getElementActionGroups(layout2.elementArr),
      ];

      return groups;
    },
  },
  spread: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.CenterToEdges];
      return getElementActionGroups(layout.elementArr);
    },
  },
  collect: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.EdgesToCenter];
      return getElementActionGroups(layout.elementArr);
    },
  },
  rotate: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.ClockWiseRotate];
      return getElementActionGroups(layout.elementArr);
    },
  },
  flash: {
    type: "static",
    sequence: ({ elements }) => {
      return getElementActionGroups([elements]);
    },
  },
  flash_step_y_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap[LayoutDirection.LeftToRight];
      const groups: ElementActionGroup[][] = [];
      const n = 2;

      const intervalArr = chunkArray(layout.elementArr, n + 1);
      for (let i = 0; i < intervalArr.length; i++) {
        const flatArr = intervalArr[i].flat();
        groups.push(getElementActionGroups([flatArr]));
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
        return getElementActionGroups([randomArray(elements, num)]);
      };
      return getGroups;
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 2 }),
    },
  },
};
