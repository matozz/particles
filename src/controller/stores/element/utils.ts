import { LayoutDirection } from "@/controller/config";
import { reverseArray } from "@/controller/utils/array";

import {
  groupElementsByAngle,
  groupElementsByAxis,
  groupElementsByDiagonal,
  groupElementsByDistance,
} from "./layout_generator";
import { Element, ElementStore } from "./types";

const getLayoutFromElements = (groups: Element[][]) => {
  const layout: Record<string, number> = {};
  groups.forEach((group, i) => {
    for (const element of group) {
      layout[element.id] = i;
    }
  });
  return layout;
};

export const getLayoutMap = (elements: Element[]) => {
  const groupAxisX = groupElementsByAxis(elements, "x");
  const groupAxisY = groupElementsByAxis(elements, "y");
  const groupDiagonalTlbr = groupElementsByDiagonal(elements, "tlbr");
  const groupDiagonalBltr = groupElementsByDiagonal(elements, "bltr");
  const groupCenterEdges = groupElementsByDistance(elements);
  const groupRotate = groupElementsByAngle(elements);

  const layoutMap: NonNullable<ElementStore["layoutMap"]> = {
    [LayoutDirection.LeftToRight]: {
      elementArr: groupAxisX,
      elementMap: getLayoutFromElements(groupAxisX),
      totalLength: groupAxisX.length,
    },
    [LayoutDirection.RightToLeft]: {
      elementArr: reverseArray(groupAxisX),
      elementMap: getLayoutFromElements(reverseArray(groupAxisX)),
      totalLength: groupAxisX.length,
    },
    [LayoutDirection.TopToBottom]: {
      elementArr: groupAxisY,
      elementMap: getLayoutFromElements(groupAxisY),
      totalLength: groupAxisY.length,
    },
    [LayoutDirection.BottomToTop]: {
      elementArr: reverseArray(groupAxisY),
      elementMap: getLayoutFromElements(reverseArray(groupAxisY)),
      totalLength: groupAxisY.length,
    },
    [LayoutDirection.TopLeftToBottomRight]: {
      elementArr: groupDiagonalTlbr,
      elementMap: getLayoutFromElements(groupDiagonalTlbr),
      totalLength: groupDiagonalTlbr.length,
    },
    [LayoutDirection.BottomRightToTopLeft]: {
      elementArr: reverseArray(groupDiagonalTlbr),
      elementMap: getLayoutFromElements(reverseArray(groupDiagonalTlbr)),
      totalLength: groupDiagonalTlbr.length,
    },
    [LayoutDirection.BottomLeftToTopRight]: {
      elementArr: groupDiagonalBltr,
      elementMap: getLayoutFromElements(groupDiagonalBltr),
      totalLength: groupDiagonalBltr.length,
    },
    [LayoutDirection.TopRightToBottomLeft]: {
      elementArr: reverseArray(groupDiagonalBltr),
      elementMap: getLayoutFromElements(reverseArray(groupDiagonalBltr)),
      totalLength: groupDiagonalBltr.length,
    },
    [LayoutDirection.CenterToEdges]: {
      elementArr: groupCenterEdges,
      elementMap: getLayoutFromElements(groupDiagonalBltr),
      totalLength: groupCenterEdges.length,
    },
    [LayoutDirection.EdgesToCenter]: {
      elementArr: reverseArray(groupCenterEdges),
      elementMap: getLayoutFromElements(reverseArray(groupCenterEdges)),
      totalLength: groupCenterEdges.length,
    },
    [LayoutDirection.ClockWiseRotate]: {
      elementArr: groupRotate,
      elementMap: getLayoutFromElements(groupRotate),
      totalLength: groupRotate.length,
    },
    [LayoutDirection.CounterClockWiseRotate]: {
      elementArr: reverseArray(groupRotate),
      elementMap: getLayoutFromElements(reverseArray(groupRotate)),
      totalLength: groupRotate.length,
    },
  };

  return layoutMap;
};
