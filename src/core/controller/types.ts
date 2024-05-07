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

export type ElementActionGroups = ElementActionGroup[];

export type ElementActionSetting = {
  actionGroups: ElementActionGroups;
  skip: boolean;
};

export type BasePresetSetting = {
  data: (
    config: ElementActionSetting,
    settings: ControllerSettings,
  ) => ElementActionSetting;
};

export type ElementSequence =
  | { type: "static"; groups: ElementActionGroups }
  | { type: "dynamic"; groups: () => ElementActionGroups };

export type ElementSequenceMap = Record<string, ElementSequence>;

export type ElementStore = {
  elementMap: Map<string, ElementInfo> | undefined;
  elementList: ElementInfo[];
  sequenceMap: ElementSequenceMap;
  bind: ElementBindFn;
  unbind: ElementUnBindFn;
  generate: () => void;
};

export type ControllerPluginSetting<T> = { mode: string; data: T };

export type ControllerPluginSettings = {
  color: ControllerPluginSetting<string[]>;
};

export type ControllerPlugins = (keyof ControllerPluginSettings)[];

export type ControllerSettings = {
  tempo: number;
  interval: number;
  repeat: number;
  step: number;
} & ControllerPluginSettings;

export type ControllerUpdateSequenceFn = (sequence: string) => void;

export type ControllerUpdateSettingsFn = (
  settings: Partial<ControllerSettings>,
) => void;

export type ControllerUpdateRepeatFn = (repeat: number) => void;
export type ControllerUpdateStepFn = (step: number) => void;
export type ControllerUpdateTempoFn = (tempo: number) => void;

export type ControllerUpdateColorFn = (
  data: Partial<ControllerPluginSetting<string[]>>,
) => void;
export type ControllerUpdateStepperFn = (
  data: Partial<ControllerPluginSetting<number>>,
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
