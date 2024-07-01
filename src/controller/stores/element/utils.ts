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
import type { Element, ElementLayout, ElementLayoutMap } from "./types";

const generateElementMap = (groups: Element[][]) => {
  const layout: Record<string, number> = {};
  groups.forEach((group, i) => {
    for (const element of group) {
      layout[element.id] = i;
    }
  });
  return layout;
};

const generateZoomLayout = (elements: Element[], reverse?: boolean) => {
  return layoutCategories.zoom.points.reduce<
    Record<(typeof layoutCategories)["zoom"]["points"][number], ElementLayout>
  >((acc, cur) => {
    const data = !reverse
      ? groupElementsByDistance(elements, cur)
      : reverseArray(groupElementsByDistance(elements, cur));
    acc[cur] = {
      elementArr: data,
      elementMap: generateElementMap(data),
      totalLength: data.length,
    };
    return acc;
  }, {} as never);
};

const generateRotateLayout = (elements: Element[], reverse?: boolean) => {
  return layoutCategories.zoom.points.reduce<
    Record<(typeof layoutCategories)["rotate"]["points"][number], ElementLayout>
  >((acc, cur) => {
    const data = !reverse
      ? groupElementsByAngle(elements, cur)
      : reverseArray(groupElementsByAngle(elements, cur));
    acc[cur] = {
      elementArr: data,
      elementMap: generateElementMap(data),
      totalLength: data.length,
    };
    return acc;
  }, {} as never);
};

const generateFlowLayout = (elements: Element[]): ElementLayoutMap["flow"] => {
  const groupAxisX = groupElementsByAxis(elements, "x");
  const groupAxisY = groupElementsByAxis(elements, "y");
  const groupDiagonalTlbr = groupElementsByDiagonal(elements, "tlbr");
  const groupDiagonalBltr = groupElementsByDiagonal(elements, "bltr");

  const createFlowDirectionLayout = <
    T extends BaseDirection,
    R extends BaseDirection,
  >(
    elementGroups: Element[][],
    baseDirection: T,
    reverseDirection: R,
  ): { [K in T | R]: ElementLayout } =>
    ({
      [baseDirection]: {
        elementArr: elementGroups,
        elementMap: generateElementMap(elementGroups),
        totalLength: elementGroups.length,
      },
      [reverseDirection]: {
        elementArr: reverseArray(elementGroups),
        elementMap: generateElementMap(reverseArray(elementGroups)),
        totalLength: elementGroups.length,
      },
    }) as { [K in T | R]: ElementLayout };

  return {
    ...createFlowDirectionLayout(
      groupAxisX,
      BaseDirection.LeftRight,
      BaseDirection.RightLeft,
    ),
    ...createFlowDirectionLayout(
      groupAxisY,
      BaseDirection.TopBottom,
      BaseDirection.BottomTop,
    ),
    ...createFlowDirectionLayout(
      groupDiagonalTlbr,
      BaseDirection.TopLeftBottomRight,
      BaseDirection.BottomRightTopLeft,
    ),
    ...createFlowDirectionLayout(
      groupDiagonalBltr,
      BaseDirection.BottomLeftTopRight,
      BaseDirection.TopRightBottomLeft,
    ),
  };
};

export const generateLayoutMap = (elements: Element[]): ElementLayoutMap => {
  const flowLayout: ElementLayoutMap["flow"] = generateFlowLayout(elements);

  const zoomLayout: ElementLayoutMap["zoom"] = {
    [ZoomDirection.ZoomOut]: generateZoomLayout(elements),
    [ZoomDirection.ZoomIn]: generateZoomLayout(elements, true),
  };

  const rotateLayout: ElementLayoutMap["rotate"] = {
    [RotateDirection.ClockWise]: generateRotateLayout(elements),
    [RotateDirection.CounterClockWise]: generateRotateLayout(elements, true),
  };

  return { flow: flowLayout, zoom: zoomLayout, rotate: rotateLayout };
};
