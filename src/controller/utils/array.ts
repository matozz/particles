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

export const chunkArray = <T>(arr: T[], step: number, groupSize = 1) => {
  const groups: T[][] = [];
  const totalGroups = Math.ceil(arr.length / groupSize);

  for (let i = 0; i < totalGroups; i++) {
    groups.push([]);
  }

  for (let i = 0; i < arr.length; i++) {
    const posInGroup = Math.floor(i / groupSize);
    const groupBase = posInGroup % step;
    const groupNum = Math.floor((i % groupSize) / step);
    const groupIndex = groupBase + groupNum * step;

    if (groups[groupIndex]) {
      groups[groupIndex].push(arr[i]);
    } else {
      groups.push([arr[i]]);
    }
  }

  return groups.filter((group) => group.length > 0);
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

export const interleaveSymmetricArrays = <T>(arr: T[][]) => {
  const len = arr.length;
  const interleavedArrays: T[][] = new Array(len).fill(null).map(() => []);

  for (let i = 0; i < len / 2; i++) {
    const currentArray = arr[i];
    const symmetricArray = arr[len - 1 - i];

    for (let j = 0; j < currentArray.length; j++) {
      if (j % 2) {
        interleavedArrays[i].push(currentArray[j]);
        interleavedArrays[len - 1 - i].push(symmetricArray[j]);
      } else {
        interleavedArrays[i].push(symmetricArray[j]);
        interleavedArrays[len - 1 - i].push(currentArray[j]);
      }
    }
  }

  return interleavedArrays;
};

export const getRandomAdjacentArrays = <T>(arr: T[][], n: number) => {
  const result: T[][] = [];

  for (const row of arr) {
    const rowLength = row.length;

    if (rowLength < n) {
      continue;
    }

    const startIndex = Math.floor(Math.random() * (rowLength - n + 1));
    const extractedArr = row.slice(startIndex, startIndex + n);
    result.push(extractedArr);
  }
  return result;
};
