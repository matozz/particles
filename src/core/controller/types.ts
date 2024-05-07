import { SchedulerHookReturn } from "../scheduler/types";

export type ElementBaseState = {
  transition?: number;
  color?: string;
};
export type ElementCallback = (state: ElementBaseState) => void;

export type ElementInfo = { x: number; y: number; callback: ElementCallback };

export type ElementBindFn = (id: string, elementInfo: ElementInfo) => void;
export type ElementUnBindFn = (id: string) => void;

export type ElementActionGroup = {
  groups: ElementInfo[];
  color?: string;
  transition?: number;
};

export type ElementActionSetting = {
  actionGroups: ElementActionGroup[];
  skip: boolean;
};

export type BasePresetSetting = {
  data: (
    config: ElementActionSetting,
    settings: ControllerSettings,
  ) => ElementActionSetting;
};

export type ElementSequence =
  | { type: "static"; groups: ElementActionGroup[] }
  | { type: "dynamic"; groups: () => ElementActionGroup[] };

export type ElementSequenceMap = Record<string, ElementSequence>;

export type ElementStore = {
  elementMap: Map<string, ElementInfo> | undefined;
  elementList: ElementInfo[];
  sequenceMap: ElementSequenceMap;
  bind: ElementBindFn;
  unbind: ElementUnBindFn;
  generate: () => void;
};

export type ControllerExtraSetting<T> = { mode: string; data: T };

export type ControllerExtraSettings = {
  color: ControllerExtraSetting<string[]>;
};

export type ControllerSettings = {
  tempo: number;
  interval: number;
  repeat: number;
  step: number;
} & ControllerExtraSettings;

export type ControllerUpdateSequenceFn = (sequence: string) => void;

export type ControllerUpdateSettingsFn = (
  settings: Partial<ControllerSettings>,
) => void;

export type ControllerUpdateRepeatFn = (repeat: number) => void;
export type ControllerUpdateStepFn = (step: number) => void;
export type ControllerUpdateTempoFn = (tempo: number) => void;

export type ControllerUpdateColorFn = (
  data: Partial<ControllerExtraSetting<string[]>>,
) => void;
export type ControllerUpdateStepperFn = (
  data: Partial<ControllerExtraSetting<number>>,
) => void;

export type ControllerStore = {
  playing: boolean;
  sequence: string;
  settings: ControllerSettings;
  updateSequence: ControllerUpdateSequenceFn;
  updateTempo: ControllerUpdateTempoFn;
  updateRepeat: ControllerUpdateRepeatFn;
  updateStep: ControllerUpdateStepFn;
  updateColor: ControllerUpdateColorFn;
  updateSettings: ControllerUpdateSettingsFn;
} & SchedulerHookReturn;

export type RuntimeStore = {
  position: number;
  skipCount: number;
  timeouts: NodeJS.Timeout[];
  setSkipCount: (count: number) => void;
  addTimeout: (timeout: NodeJS.Timeout) => void;
  tick: (repeat?: number) => void;
  reset: () => void;
};

export type BindElementHook = (
  elementId: string,
  elementInfo: ElementInfo,
) => void;
export type BindLayoutHook = (layoutId: string, count: number) => void;
