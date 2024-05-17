import { SchedulerHookReturn } from "../scheduler/types";
import { LayoutDirection } from "./constant";

export type ElementBaseState = {
  transition?: number;
  color?: string;
  ease?: [number, number, number, number];
};
export type ElementCallback = (state: ElementBaseState) => void;

export type ElementBindData = {
  x: number;
  y: number;
  callback: ElementCallback;
};

export type ElementInfo = { id: string } & ElementBindData;

export type ElementActionState = { color?: string; transition?: number };

export type ElementActionGroup = {
  groups: (ElementInfo & ElementActionState)[];
} & ElementActionState;

export type ElementSequence =
  | { type: "static"; sequence: ElementActionGroup[][] }
  | { type: "dynamic"; sequence: (() => ElementActionGroup[])[] };

export type ElementPresetMap = Record<string, ElementSequence>;

export type ElementLayoutMap = Record<
  LayoutDirection,
  {
    totalLength: number;
    elementArr: ElementInfo[][];
    elementMap: Record<string, number>;
  }
>;

export type ElementSequencePresetOptions = {
  density?: number;
};

type SequenceProps = {
  elements: ElementInfo[];
  layoutMap: ElementLayoutMap;
  options?: ElementSequencePresetOptions;
};

export type ElementSequencePreset =
  | {
      type: "static";
      sequence: (props: SequenceProps) => ElementActionGroup[];
    }
  | {
      type: "static";
      step: (props: SequenceProps) => ElementActionGroup[][];
    }
  | {
      type: "dynamic";
      sequence: (props: SequenceProps) => () => ElementActionGroup[];
    }
  | {
      type: "dynamic";
      step: (props: SequenceProps) => (() => ElementActionGroup[])[];
    };

export type ElementBindFn = (id: string, elementInfo: ElementInfo) => void;
export type ElementUnBindFn = (id: string) => void;

export type ElementStore = {
  elementMap: Map<string, ElementInfo>;
  presetMap: ElementPresetMap | undefined;
  layoutMap: ElementLayoutMap | undefined;
  bind: ElementBindFn;
  unbind: ElementUnBindFn;
  generate: () => void;
};

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
  options?: ElementSequencePresetOptions;
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
  sequence: ControllerSequenceSetting;
  settings: ControllerSettings;
  updateSequence: ControllerUpdateSequenceFn;
  updateTempo: ControllerUpdateTempoFn;
  updateRepeat: ControllerUpdateRepeatFn;
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
  elementInfo: ElementBindData,
) => void;

export type BindLayoutHook = (layoutId: string, count: number) => void;
