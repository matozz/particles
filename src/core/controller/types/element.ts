import { LayoutDirection } from "../constant";

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

export type ElementSequenceStatic = {
  type: "static";
  sequence: ElementActionGroup[][];
};
export type ElementSequenceDynamic = {
  type: "dynamic";
  sequence: (() => ElementActionGroup[])[];
};

export type ElementSequence = ElementSequenceStatic | ElementSequenceDynamic;

export type ElementPresetMap = Record<string, ElementSequence>;

export type ElementLayout = {
  totalLength: number;
  elementArr: ElementInfo[][];
  elementMap: Record<string, number>;
};

export type ElementLayoutMap = Record<LayoutDirection, ElementLayout>;

export type ElementSequenceOptions = {
  density?: number;
};

type SequenceProps = {
  elements: ElementInfo[];
  layoutMap: ElementLayoutMap;
  options?: ElementSequenceOptions;
};

export type ElementStaticSequencePreset = {
  type: "static";
  sequence: (props: SequenceProps) => ElementActionGroup[];
};

export type ElementStaticStepPreset = {
  type: "static";
  step: (props: SequenceProps) => ElementActionGroup[][];
};

export type ElementDynamicSequencePreset = {
  type: "dynamic";
  sequence: (props: SequenceProps) => () => ElementActionGroup[];
};

export type ElementDynamicStepPreset = {
  type: "dynamic";
  step: (props: SequenceProps) => (() => ElementActionGroup[])[];
};

export type ElementSequencePreset =
  | ElementStaticSequencePreset
  | ElementStaticStepPreset
  | ElementDynamicSequencePreset
  | ElementDynamicStepPreset;

export type ElementStore = {
  elementMap: Map<string, Map<string, ElementInfo>>;
  presetMap: ElementPresetMap | undefined;
  layoutMap: ElementLayoutMap | undefined;
  bind: ElementBindFn;
  unbind: ElementUnBindFn;
  generate: ElementGenerateFn;
};

export type ElementBindFn = (
  layoutId: string,
  elementId: string,
  elementInfo: ElementInfo,
) => void;

export type ElementUnBindFn = (layoutId: string, elementId: string) => void;

export type ElementGenerateFn = (layoutId: string) => void;
