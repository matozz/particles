export const getRandomArr = <T>(
  elements: T[],
  num = Math.round(elements.length / 2),
) => [...elements].sort(() => 0.5 - Math.random()).slice(0, num);

export const repeatArray = <T>(arr: T[], n: number) => {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    arr.forEach((item) => result.push(item));
  }
  return result;
};

export const reverseArray = <T>(arr: T[]) => [...arr].reverse();

export const transposeArray = <T>(matrix: T[][]) =>
  matrix[0].map((_, i) => matrix.map((row) => row[i]));

export function groupArrayByInterval<T>(array: T[], interval: number): T[][] {
  const groups: T[][] = [];

  for (let i = 0; i < interval; i++) {
    groups.push([]);
  }

  array.forEach((element, index) => {
    const groupIndex = index % interval;
    groups[groupIndex].push(element);
  });

  return groups;
}
