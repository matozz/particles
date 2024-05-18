export type RuntimeStore = {
  position: number;
  skipCount: number;
  timeouts: NodeJS.Timeout[];
  setSkipCount: (count: number) => void;
  addTimeout: (timeout: NodeJS.Timeout) => void;
  tick: (repeat?: number) => void;
  reset: () => void;
};
