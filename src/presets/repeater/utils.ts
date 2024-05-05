export const expandArray = <T>(arr: T[], n: number) => {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    arr.forEach((item) => result.push({ ...item }));
  }
  return result;
};

export const getTransition = (tempo: number, repeat = 1) =>
  Number((60 / (tempo * repeat)).toFixed(3));
