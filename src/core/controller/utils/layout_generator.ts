import { LayoutDirection } from "../constant";
import { ElementInfo, ElementStore } from "../stores/element/types";
import { reverseArray } from "./array";

const getLayoutFromElements = (groups: ElementInfo[][]) => {
  const layout: Record<string, number> = {};
  groups.forEach((group, i) => {
    for (const element of group) {
      layout[element.id] = i;
    }
  });
  return layout;
};

const groupElementsByAxis = (elements: ElementInfo[], mode: "x" | "y") => {
  const groups = new Map<number, ElementInfo[]>();

  elements.forEach((element) => {
    const key = element[mode];
    if (groups.has(key)) {
      groups.get(key)?.push(element);
    } else {
      groups.set(key, [element]);
    }
  });

  const groupedElements = Array.from(groups.values());
  groupedElements.sort((a, b) => a[0][mode] - b[0][mode]);

  return groupedElements;
};

const groupElementsByDiagonal = (
  elements: ElementInfo[],
  mode: "tlbr" | "bltr",
): ElementInfo[][] => {
  const diagonals: { [sum: number]: ElementInfo[] } = {};

  for (const element of elements) {
    const value =
      mode === "tlbr" ? element.x + element.y : element.y - element.x;
    if (!diagonals[value]) {
      diagonals[value] = [];
    }
    diagonals[value].push(element);
  }

  for (const value in diagonals) {
    diagonals[value].sort((a, b) => (mode === "tlbr" ? a.x - b.x : b.y - a.y));
  }

  return Object.keys(diagonals)
    .sort((a, b) =>
      mode === "tlbr" ? parseInt(b) - parseInt(a) : parseInt(a) - parseInt(b),
    )
    .map((value) => diagonals[Number(value)]);
};

export const getLayoutMap = (elements: ElementInfo[]) => {
  const groupAxisX = groupElementsByAxis(elements, "x");
  const groupAxisY = groupElementsByAxis(elements, "y");
  const groupDiagonalTlbr = groupElementsByDiagonal(elements, "tlbr");
  const groupDiagonalBltr = groupElementsByDiagonal(elements, "bltr");

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
  };

  return layoutMap;
};
