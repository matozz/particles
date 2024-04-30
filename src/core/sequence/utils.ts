import { ElementInfo } from "../controller";

export const getRandomElements = (
  elements: ElementInfo[],
  num = Math.round(elements.length / 2),
) => [...elements].sort(() => 0.5 - Math.random()).slice(0, num);

const calculateCentroid = (elements: ElementInfo[]) => {
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

const distanceFromCentroid = (
  element: ElementInfo,
  centroid: { x: number; y: number },
) => Math.sqrt((element.x - centroid.x) ** 2 + (element.y - centroid.y) ** 2);

const calculateAngle = (
  element: ElementInfo,
  centroid: { x: number; y: number },
) => {
  return Math.atan2(element.y - centroid.y, element.x - centroid.x);
};

// Elements group utilities

export const groupElementsByAxis = (
  elements: ElementInfo[],
  axis: "x" | "y",
) => {
  const groups = new Map<number, ElementInfo[]>();

  elements.forEach((element) => {
    const key = element[axis];
    if (groups.has(key)) {
      groups.get(key)?.push(element);
    } else {
      groups.set(key, [element]);
    }
  });

  const groupedElements = Array.from(groups.values());
  groupedElements.sort((a, b) => a[0][axis] - b[0][axis]);

  return groupedElements;
};

export const groupElementsByDistance = (elements: ElementInfo[]) => {
  const centroid = calculateCentroid(elements);
  const distanceGroups = new Map<number, ElementInfo[]>();

  elements.forEach((element) => {
    const distance = distanceFromCentroid(element, centroid);
    if (distanceGroups.has(distance)) {
      distanceGroups.get(distance)?.push(element);
    } else {
      distanceGroups.set(distance, []);
    }
  });

  const groupedElements = Array.from(distanceGroups)
    .sort((a, b) => a[0] - b[0])
    .map((group) => group[1]);

  return groupedElements;
};

export const groupElementsByAngle = (elements: ElementInfo[]) => {
  const centroid = calculateCentroid(elements);
  const angleGroups = new Map<number, ElementInfo[]>();

  elements.forEach((element) => {
    const angle = calculateAngle(element, centroid);
    if (angleGroups.has(angle)) {
      angleGroups.get(angle)?.push(element);
    } else {
      angleGroups.set(angle, [element]);
    }
  });

  const groupedElements = Array.from(angleGroups)
    .sort((a, b) => a[0] - b[0])
    .map((group) => group[1]);

  return groupedElements;
};
