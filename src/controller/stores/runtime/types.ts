export type AnimationFrame =
  | { type: "sto"; timerId: NodeJS.Timeout }
  | { type: "raf"; rafId: number };

export type AnimationFrameType = AnimationFrame["type"];

export interface RuntimeStore {
  beats: number;
  beatsToSkip: number;
  animationFrames: AnimationFrame[];
}
