import { PresetExtraOptions } from "@/controller/sequence/types";

import { AnimationFrameType } from "../runtime/types";

export type ControllerExtraSetting<T> = { mode: string; data: T };

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
  playing: boolean;
  triggerMode: AnimationFrameType;
  sequence: ControllerSequenceSetting;
  settings: ControllerSettings;
}
