export const reverseArray = <T>(arr: T[]) => [...arr].reverse();

export const randomArray = <T>(arr: T[], num = Math.round(arr.length / 2)) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, num);

export const repeatArray = <T>(arr: T[], n: number) => {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    arr.forEach((item) => result.push(item));
  }
  return result;
};

export const transposeArray = <T>(matrix: T[][]) => {
  if (matrix.length === 0) {
    return [];
  }
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
};

export const chunkArray = <T>(array: T[], step: number) => {
  const groups: T[][] = [];
  for (let i = 0; i < step && i < array.length; i++) {
    groups.push([]);
  }
  array.forEach((element, index) => {
    const groupIndex = index % step;
    groups[groupIndex].push(element);
  });
  return groups;
};
