export const getActiveIdx = (position: number, length: number) =>
  (position - 1) % length;

export const getActiveIdxList = (
  position: number,
  length: number,
  gap: number,
) => {
  const list: number[] = [];

  let idx = getActiveIdx(position, length);

  while (idx <= length - 1) {
    list.push(idx);
    idx += gap + 1;
  }

  let idx2 = getActiveIdx(position, length);

  while (idx2 >= 0) {
    if (!list.includes(idx2)) {
      list.push(idx2);
    }
    idx2 -= gap + 1;
  }

  return list.sort((a, b) => a - b);
};
