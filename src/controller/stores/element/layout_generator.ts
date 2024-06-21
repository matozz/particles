import { BasePoint } from "@/controller/config";

import { Element } from "./types";

const precision = 4;

// layout base utils

export const calculateCornerPoints = (elements: Element[]) => {
  let topLeft = elements[0],
    bottomLeft = elements[0],
    topRight = elements[0],
    bottomRight = elements[0];

  elements.forEach((element) => {
    if (element.x <= topLeft.x && element.y <= topLeft.y) {
      topLeft = element;
    }
    if (element.x <= bottomLeft.x && element.y >= bottomLeft.y) {
      bottomLeft = element;
    }
    if (element.x >= topRight.x && element.y <= topRight.y) {
      topRight = element;
    }
    if (element.x >= bottomRight.x && element.y >= bottomRight.y) {
      bottomRight = element;
    }
  });

  return {
    [BasePoint.TopLeft]: topLeft,
    [BasePoint.BottomLeft]: bottomLeft,
    [BasePoint.TopRight]: topRight,
    [BasePoint.BottomRight]: bottomRight,
  };
};

export const calculateCentroidPoint = (elements: Element[]) => {
  const sum = elements.reduce(
    (acc, coord) => {
      acc.x += coord.x;
      acc.y += coord.y;
      return acc;
    },
    { x: 0, y: 0 },
  );
  return { x: sum.x / elements.length, y: sum.y / elements.length };
};

export const distanceFromCentroid = (
  element: Element,
  centroid: { x: number; y: number },
) => {
  return Math.sqrt(
    (element.x - centroid.x) ** 2 + (element.y - centroid.y) ** 2,
  );
};

export const calculateAngle = (
  element: Element,
  centroid: { x: number; y: number },
) => {
  return Math.atan2(element.y - centroid.y, element.x - centroid.x);
};

// group helpers

export const groupElementsByAxis = (elements: Element[], mode: "x" | "y") => {
  const groups = new Map<number, Element[]>();

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

export const groupElementsByDiagonal = (
  elements: Element[],
  mode: "tlbr" | "bltr",
): Element[][] => {
  const diagonals: { [sum: number]: Element[] } = {};

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

export const groupElementsByDistance = (
  elements: Element[],
  pointType: BasePoint.Center | keyof ReturnType<typeof calculateCornerPoints>,
) => {
  const point =
    pointType === BasePoint.Center
      ? calculateCentroidPoint(elements)
      : calculateCornerPoints(elements)[pointType];

  const distanceGroups = new Map<number, Element[]>();

  elements.forEach((element) => {
    const distance = Number(
      distanceFromCentroid(element, point).toFixed(precision),
    );
    if (!distanceGroups.has(distance)) {
      distanceGroups.set(distance, []);
    }
    distanceGroups.get(distance)?.push(element);
  });

  const groupedElements = Array.from(distanceGroups)
    .sort((a, b) => a[0] - b[0])
    .map((group) => group[1]);

  return groupedElements;
};

export const groupElementsByAngle = (
  elements: Element[],
  pointType: BasePoint.Center | keyof ReturnType<typeof calculateCornerPoints>,
) => {
  const point =
    pointType === BasePoint.Center
      ? calculateCentroidPoint(elements)
      : calculateCornerPoints(elements)[pointType];

  const angleGroups = new Map<number, Element[]>();

  let baseElement: Element | undefined;

  elements.forEach((element) => {
    if (element.x === point.x && element.y === point.y) {
      baseElement = element;
      return;
    }
    const angle = Number(calculateAngle(element, point).toFixed(precision));
    if (angleGroups.has(angle)) {
      angleGroups.get(angle)?.push(element);
    } else {
      angleGroups.set(angle, [element]);
    }
  });

  const groupedElements = Array.from(angleGroups)
    .sort((a, b) => a[0] - b[0])
    .map((group) => group[1]);

  if (baseElement) {
    groupedElements[0].unshift(baseElement);
    groupedElements[groupedElements.length - 1].unshift(baseElement);
  }

  return groupedElements;
};
