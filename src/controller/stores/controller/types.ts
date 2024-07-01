import type { PresetExtraOptions } from "@/controller/sequence/types";
import type { AnimationFrame } from "../runtime/types";

export type ControllerExtraSetting<T> = { mode: string; data: T };

export type ControllerTriggerMode = AnimationFrame["type"];

export interface ControllerExtraSettings {
  color: ControllerExtraSetting<{
    colors: string[];
  }>;
}

export interface ControllerSettings extends ControllerExtraSettings {
  tempo: number;
  interval: number;
  repeat: number;
}

export interface ControllerSequenceSetting {
  type: string;
  options?: PresetExtraOptions;
}

export interface ControllerStore {
  isPlaying: boolean;
  triggerMode: ControllerTriggerMode;
  sequence: ControllerSequenceSetting;
  settings: ControllerSettings;
}
