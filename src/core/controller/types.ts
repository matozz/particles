import { SchedulerHookReturn } from "../scheduler/types";

export type ElementBaseState = { tempo: number };
export type ElementCallback = (state: ElementBaseState) => void;

export type ElementInfo = { x: number; y: number; callback: ElementCallback };

export type ElementBindFn = (id: string, elementInfo: ElementInfo) => void;
export type ElementUnBindFn = (id: string) => void;

export type ElementGroupMeta =
  | { type: "static"; groups: ElementInfo[][] }
  | { type: "dynamic"; groups: () => ElementInfo[][] };

export type ElementGroupMap = Record<string, ElementGroupMeta>;

export type ElementStore = {
  elementMap: Map<string, ElementInfo> | undefined;
  elementList: ElementInfo[];
  elementGroupMap: ElementGroupMap;
  bind: ElementBindFn;
  unbind: ElementUnBindFn;
  generate: () => void;
};

export type ControllerSettings = {
  tempo: number;
  interval: number;
};

export type ControllerUpdateSequenceFn = (sequence: string) => void;

export type ControllerUpdateSettingsFn = (
  settings: Partial<ControllerSettings>,
) => void;

export type ControllerUpdateTempoFn = (tempo: number) => void;

export type ControllerStore = {
  playing: boolean;
  sequence: string;
  settings: ControllerSettings;
  updateSequence: ControllerUpdateSequenceFn;
  updateTempo: ControllerUpdateTempoFn;
  updateSettings: ControllerUpdateSettingsFn;
} & SchedulerHookReturn;

export type BindElementHook = (
  elementId: string,
  elementInfo: ElementInfo,
) => void;
export type BindLayoutHook = (layoutId: string, count: number) => void;
