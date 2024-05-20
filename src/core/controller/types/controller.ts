import { SchedulerHookReturn } from "@/core/scheduler";

import { LayoutDirection } from "../constant";
import { ElementSequenceOptions } from "./element";
import { ActiveFrameType } from "./runtime";

export type ControllerExtraSetting<T> = { mode: string; data: T };

export type ControllerExtraSettings = {
  color: ControllerExtraSetting<{
    direction: LayoutDirection | undefined;
    colors: string[];
  }>;
};

export type ControllerSettings = {
  tempo: number;
  interval: number;
  repeat: number;
} & ControllerExtraSettings;

export type ControllerSequenceSetting = {
  type: string;
  options?: ElementSequenceOptions;
};

export type ControllerUpdateSequenceFn = (
  sequence: ControllerSequenceSetting,
) => void;

export type ControllerUpdateSettingsFn = (
  settings: Partial<ControllerSettings>,
) => void;

export type ControllerUpdateRepeatFn = (repeat: number) => void;

export type ControllerUpdateTempoFn = (tempo: number) => void;

export type ControllerUpdateColorFn = (
  data: Partial<ControllerExtraSettings["color"]>,
) => void;

export type ControllerStore = {
  playing: boolean;
  triggerMode: ActiveFrameType;
  sequence: ControllerSequenceSetting;
  settings: ControllerSettings;
  updateSequence: ControllerUpdateSequenceFn;
  updateTempo: ControllerUpdateTempoFn;
  updateRepeat: ControllerUpdateRepeatFn;
  updateColor: ControllerUpdateColorFn;
  updateSettings: ControllerUpdateSettingsFn;
} & SchedulerHookReturn;
