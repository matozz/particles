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

export const chunkArray = <T>(arr: T[], step: number) => {
  const groups: T[][] = [];
  for (let i = 0; i < step && i < arr.length; i++) {
    groups.push([]);
  }
  arr.forEach((element, index) => {
    const groupIndex = index % step;
    groups[groupIndex].push(element);
  });
  return groups;
};

export const evenlyDistributeArray = <T>(arr: T[], n: number) => {
  const totalLength = arr.length;
  const baseSize = Math.floor(totalLength / n);
  const remainder = totalLength % n;
  const result = [];

  let startIndex = 0;
  for (let i = 0; i < n; i++) {
    let groupSize = baseSize;

    // If there's an odd remainder, add the extra element to the center
    if (remainder % 2 !== 0 && i === Math.floor(n / 2)) {
      groupSize++;
    } else if (remainder > 1) {
      // If there's more than one extra element
      if (n % 2 === 0) {
        // For even n, distribute extras around the center
        if (i === n / 2 - 1 || i === n / 2) {
          groupSize += Math.floor((remainder - 1) / 2);
        }
      } else {
        // For odd n, distribute extras to the sides of the center
        if (i === Math.floor(n / 2) - 1 || i === Math.floor(n / 2) + 1) {
          groupSize += Math.floor(remainder / 2);
        }
      }
    }

    result.push(arr.slice(startIndex, startIndex + groupSize));
    startIndex += groupSize;
  }

  return result;
};
