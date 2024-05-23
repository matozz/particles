export type ActiveFrame =
  | { type: "sto"; timerId: NodeJS.Timeout }
  | { type: "raf"; rafId: number };

export type ActiveFrameType = ActiveFrame["type"];

export type RuntimeStore = {
  position: number;
  skipCount: number;
  activeFrames: ActiveFrame[];
  createActiveFrame: (args: ActiveFrame) => void;
  setSkipCount: (count: number) => void;
  tick: (repeat?: number) => void;
  reset: () => void;
};
