import {
  Element,
  ElementLayoutMap,
  ElementActionGroup,
  ElementTriggerOptions,
} from "../stores/element";

export interface PresetExtraOptions {
  density?: number;
}

export interface PresetGeneratorConfig {
  elements: Element[];
  layoutMap: ElementLayoutMap;
  options?: PresetExtraOptions;
}

export interface PresetHooks {
  transformTrigger?: (options: ElementTriggerOptions) => ElementTriggerOptions;
  transformDuration?: (duration: number) => number;
}

export interface StaticSequencePreset {
  type: "static";
  sequence: (config: PresetGeneratorConfig) => ElementActionGroup[];
}

export interface StaticStepPreset {
  type: "static";
  step: (config: PresetGeneratorConfig) => ElementActionGroup[][];
}

export interface DynamicSequencePreset {
  type: "dynamic";
  sequence: (config: PresetGeneratorConfig) => () => ElementActionGroup[];
}

export interface DynamicStepPreset {
  type: "dynamic";
  step: (config: PresetGeneratorConfig) => Array<() => ElementActionGroup[]>;
}

export type ElementSequencePreset = (
  | StaticSequencePreset
  | StaticStepPreset
  | DynamicSequencePreset
  | DynamicStepPreset
) & { hooks?: PresetHooks };
