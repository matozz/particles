import { SchedulerHookReturn } from "../scheduler/types";

export type ElementBaseState = ControllerSettings;
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
};

export type ControllerSettings = {
  tempo: number;
  interval: number;
};

export type ControllerUpdateSettingsFn = (
  settings: Partial<ControllerSettings>,
) => void;

export type ControllerUpdateTempoFn = (tempo: number) => void;

export type ControllerStore = {
  playing: boolean;
  settings: ControllerSettings;
  updateTempo: ControllerUpdateTempoFn;
  updateSettings: ControllerUpdateSettingsFn;
} & SchedulerHookReturn;

export type UseBindElementHook = (id: string, elementInfo: ElementInfo) => void;
