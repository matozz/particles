import type {
  ControllerSequenceSetting,
  ControllerSettings,
} from "../controller/types";

export interface PatternBase {
  start: number;
  duration: number;
}

export interface FilterPattern extends PatternBase {
  start: number;
  duration: number;
}
export interface SequencePattern extends PatternBase {
  start: number;
  duration: number;
  settings: {
    sequence: ControllerSequenceSetting;
  } & Omit<ControllerSettings, "tempo" | "interval">;
}

export interface Track {
  name: string;
  tempo: number;
  patterns: {
    filters?: FilterPattern[];
    sequences?: SequencePattern[];
  };
}

export interface PlaylistStore {
  beats: number;
  track: Track | undefined;
}
