import { ElementActionGroup, ElementInfo } from "../stores/element/types";

const precision = 4;

export const getActionGroups = (
  groups: ElementInfo[][],
): ElementActionGroup[] => groups.map((v) => ({ groups: v }));

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

export const groupElementsByDistance = (elements: ElementInfo[]) => {
  const centroid = calculateCentroid(elements);

  const distanceGroups = new Map<number, ElementInfo[]>();

  elements.forEach((element) => {
    const distance = Number(
      distanceFromCentroid(element, centroid).toFixed(precision),
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

export const groupElementsByAngle = (elements: ElementInfo[]) => {
  const centroid = calculateCentroid(elements);
  const angleGroups = new Map<number, ElementInfo[]>();

  elements.forEach((element) => {
    const angle = Number(calculateAngle(element, centroid).toFixed(precision));
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
