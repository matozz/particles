export const getRandomArr = <T>(arr: T[], num = Math.round(arr.length / 2)) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, num);

export const repeatArray = <T>(arr: T[], n: number) => {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    arr.forEach((item) => result.push(item));
  }
  return result;
};

export const reverseArray = <T>(arr: T[]) => [...arr].reverse();

export const transposeArray = <T>(matrix: T[][]) => {
  if (matrix.length === 0) {
    return [];
  }
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
};

export const groupArrayByInterval = <T>(array: T[], interval: number) => {
  const groups: T[][] = [];
  for (let i = 0; i < interval && i < array.length; i++) {
    groups.push([]);
  }
  array.forEach((element, index) => {
    const groupIndex = index % interval;
    groups[groupIndex].push(element);
  });
  return groups;
};
