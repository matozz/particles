import {
  BaseDirection,
  RotateDirection,
  ZoomDirection,
  layoutCategories,
} from "@/controller/config";
import { reverseArray } from "@/controller/utils/array";

import {
  groupElementsByAngle,
  groupElementsByAxis,
  groupElementsByDiagonal,
  groupElementsByDistance,
} from "./layout_generator";
import { Element, ElementLayout, ElementLayoutMap } from "./types";

const getLayoutFromElements = (groups: Element[][]) => {
  const layout: Record<string, number> = {};
  groups.forEach((group, i) => {
    for (const element of group) {
      layout[element.id] = i;
    }
  });
  return layout;
};

const getZoomLayout = (elements: Element[], reverse?: boolean) => {
  return layoutCategories.zoom.points.reduce<
    Record<(typeof layoutCategories)["zoom"]["points"][number], ElementLayout>
  >((acc, cur) => {
    const data = !reverse
      ? groupElementsByDistance(elements, cur)
      : reverseArray(groupElementsByDistance(elements, cur));
    acc[cur] = {
      elementArr: data,
      elementMap: getLayoutFromElements(data),
      totalLength: data.length,
    };
    return acc;
  }, {} as never);
};

const getRotateLayout = (elements: Element[], reverse?: boolean) => {
  return layoutCategories.zoom.points.reduce<
    Record<(typeof layoutCategories)["rotate"]["points"][number], ElementLayout>
  >((acc, cur) => {
    const data = !reverse
      ? groupElementsByAngle(elements, cur)
      : reverseArray(groupElementsByAngle(elements, cur));
    acc[cur] = {
      elementArr: data,
      elementMap: getLayoutFromElements(data),
      totalLength: data.length,
    };
    return acc;
  }, {} as never);
};

export const getLayoutMap = (elements: Element[]): ElementLayoutMap => {
  const groupAxisX = groupElementsByAxis(elements, "x");
  const groupAxisY = groupElementsByAxis(elements, "y");
  const groupDiagonalTlbr = groupElementsByDiagonal(elements, "tlbr");
  const groupDiagonalBltr = groupElementsByDiagonal(elements, "bltr");

  const flowLayout: ElementLayoutMap["flow"] = {
    [BaseDirection.LeftRight]: {
      elementArr: groupAxisX,
      elementMap: getLayoutFromElements(groupAxisX),
      totalLength: groupAxisX.length,
    },
    [BaseDirection.RightLeft]: {
      elementArr: reverseArray(groupAxisX),
      elementMap: getLayoutFromElements(reverseArray(groupAxisX)),
      totalLength: groupAxisX.length,
    },
    [BaseDirection.TopBottom]: {
      elementArr: groupAxisY,
      elementMap: getLayoutFromElements(groupAxisY),
      totalLength: groupAxisY.length,
    },
    [BaseDirection.BottomTop]: {
      elementArr: reverseArray(groupAxisY),
      elementMap: getLayoutFromElements(reverseArray(groupAxisY)),
      totalLength: groupAxisY.length,
    },
    [BaseDirection.TopLeftBottomRight]: {
      elementArr: groupDiagonalTlbr,
      elementMap: getLayoutFromElements(groupDiagonalTlbr),
      totalLength: groupDiagonalTlbr.length,
    },
    [BaseDirection.BottomRightTopLeft]: {
      elementArr: reverseArray(groupDiagonalTlbr),
      elementMap: getLayoutFromElements(reverseArray(groupDiagonalTlbr)),
      totalLength: groupDiagonalTlbr.length,
    },
    [BaseDirection.BottomLeftTopRight]: {
      elementArr: groupDiagonalBltr,
      elementMap: getLayoutFromElements(groupDiagonalBltr),
      totalLength: groupDiagonalBltr.length,
    },
    [BaseDirection.TopRightBottomLeft]: {
      elementArr: reverseArray(groupDiagonalBltr),
      elementMap: getLayoutFromElements(reverseArray(groupDiagonalBltr)),
      totalLength: groupDiagonalBltr.length,
    },
  };

  const zoomLayout: ElementLayoutMap["zoom"] = {
    [ZoomDirection.ZoomOut]: getZoomLayout(elements),
    [ZoomDirection.ZoomIn]: getZoomLayout(elements, true),
  };

  const rotateLayout: ElementLayoutMap["rotate"] = {
    [RotateDirection.ClockWise]: getRotateLayout(elements),
    [RotateDirection.CounterClockWise]: getRotateLayout(elements, true),
  };

  return { flow: flowLayout, zoom: zoomLayout, rotate: rotateLayout };
};
