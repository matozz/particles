import {
  BaseDirection,
  BasePoint,
  RotateDirection,
  ZoomDirection,
} from "../config";
import type { ElementGroup } from "../stores/element/types";
import {
  chunkArray,
  evenlyDistributeArray,
  getRandomAdjacentArrays,
  interleaveSymmetricArrays,
  randomArray,
  reverseArray,
  transposeArray,
} from "../utils/array";
import type { ElementSequencePreset } from "./types";
import { createTransformHook } from "./utils";

export const sequencePresets: Record<string, ElementSequencePreset> = {
  flow: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.LeftRight];
      return layout.elementArr;
    },
  },
  flow_spread: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.CenterLeftRight];
      return layout.elementArr;
    },
  },
  flow_triplet: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.LeftRight];
      const intervalArr = evenlyDistributeArray(layout.elementArr, 3);
      const mergedArr = intervalArr.map((arr) => arr.flat());
      return mergedArr;
    },
  },
  flow_step_x_single: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.TopBottom];
      return layout.elementArr.map((elements) =>
        elements.map((element) => [element]),
      );
    },
  },
  flow_step_y_single: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.LeftRight];
      return layout.elementArr.map((elements) =>
        elements.map((element) => [element]),
      );
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 2 }),
    },
  },
  flow_step_y_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.LeftRight];
      const groups: ElementGroup[][] = [];
      const n = 2;

      const intervalArr = chunkArray(layout.elementArr, n + 1);
      const transposeArr = intervalArr.map((v) => transposeArray(v));

      for (let i = 0; i < transposeArr.length; i++) {
        groups.push(transposeArr[i]);
      }
      return groups;
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 2 }),
    },
  },
  flow_step_y_reverse_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.LeftRight];
      const groups: ElementGroup[][] = [];
      const n = 1;

      const intervalArr = chunkArray(layout.elementArr, n + 1, 2);
      const transposeArr = intervalArr.map((v) => transposeArray(v));

      for (let i = 0; i < transposeArr.length; i++) {
        groups.push([
          ...reverseArray(transposeArr[i]),
          ...transposeArr[i].slice(1),
        ]);
      }
      return groups;
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 0.8 }),
    },
  },
  flow_step_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.BottomRightTopLeft];
      const groups: ElementGroup[][] = [];
      const n = 1;

      const intervalArr = chunkArray(layout.elementArr, n + 1);

      for (let i = 0; i < intervalArr.length; i++) {
        groups.push(intervalArr[i]);
      }

      return groups;
    },
  },
  reverse_flow: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout1 = layoutMap.flow[BaseDirection.LeftRight];
      const layout2 = layoutMap.flow[BaseDirection.RightLeft];

      return [...layout1.elementArr, ...layout2.elementArr];
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 0.5 }),
    },
  },
  reverse_step_flow: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout1 = layoutMap.flow[BaseDirection.LeftRight];
      const layout2 = layoutMap.flow[BaseDirection.RightLeft];

      return [layout1.elementArr, layout2.elementArr];
    },
  },
  reverse_flow_cross: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.LeftRight];
      return interleaveSymmetricArrays(layout.elementArr);
    },
    options: {
      trailingBlanksN: 0.4,
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 0.5 }),
    },
  },
  reverse_bottom_left_rotate: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout1 =
        layoutMap.rotate[RotateDirection.ClockWise][BasePoint.BottomLeft];
      const layout2 =
        layoutMap.rotate[RotateDirection.CounterClockWise][
          BasePoint.BottomLeft
        ];
      return [...layout1.elementArr, ...layout2.elementArr];
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 0.5 }),
    },
  },
  zoom_out: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap.zoom[ZoomDirection.ZoomOut][BasePoint.Center];
      return layout.elementArr;
    },
  },
  zoom_out_step_bottom_left: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout1 =
        layoutMap.zoom[ZoomDirection.ZoomOut][BasePoint.BottomLeft];
      const layout2 =
        layoutMap.zoom[ZoomDirection.ZoomOut][BasePoint.BottomRight];
      return [layout1.elementArr, layout2.elementArr];
    },
  },
  zoom_in: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap.zoom[ZoomDirection.ZoomIn][BasePoint.Center];
      return layout.elementArr;
    },
  },
  rotate: {
    type: "static",
    sequence: ({ layoutMap }) => {
      const layout =
        layoutMap.rotate[RotateDirection.ClockWise][BasePoint.Center];
      return layout.elementArr;
    },
  },
  flash: {
    type: "static",
    sequence: ({ elements }) => {
      return [elements];
    },
  },
  flash_color: {
    type: "static",
    sequence: ({ elements }) => {
      return [
        elements.map((element) => ({ ...element, color: "#ff0000" })),
        elements.map((element) => ({ ...element, color: "#0000ff" })),
      ];
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 2 }),
    },
  },
  flash_step_y_multi: {
    type: "static",
    step: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.LeftRight];
      const groups: ElementGroup[][] = [];
      const n = 2;

      const intervalArr = chunkArray(layout.elementArr, n + 1);
      for (let i = 0; i < intervalArr.length; i++) {
        const flatArr = intervalArr[i].flat();
        groups.push([flatArr]);
      }
      return groups;
    },
  },
  flick: {
    type: "dynamic",
    sequence: ({ elements, options }) => {
      const { density = 0.25 } = options || {};
      const getGroups = () => {
        const num = Math.round(elements.length * density);
        return [randomArray(elements, num)];
      };
      return getGroups;
    },
    hooks: {
      transformTrigger: createTransformHook({ transitionMultiplier: 2 }),
    },
  },
  flow_random: {
    type: "dynamic",
    sequence: ({ layoutMap }) => {
      const layout = layoutMap.flow[BaseDirection.TopBottom];

      const getGroups = () => {
        const adjacentArr = getRandomAdjacentArrays(layout.elementArr, 4);
        return transposeArray(adjacentArr);
      };
      return getGroups;
    },
    options: {
      trailingBlanksN: 1,
    },
  },
};
