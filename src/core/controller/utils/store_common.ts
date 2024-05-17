export const mergeState = <T>(state: T, values: Partial<T>): T => ({
  ...state,
  ...values,
});
