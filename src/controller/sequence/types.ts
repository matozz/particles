import type {
  Element,
  ElementLayoutMap,
  ElementTriggerOptions,
  ElementGroup,
} from "../stores/element/types";

export interface PresetExtraOptions {
  density?: number;
}

export interface PresetGeneratorConfig {
  elements: Element[];
  layoutMap: ElementLayoutMap;
  options?: PresetExtraOptions;
}

export interface PresetOptions {
  trailingBlanksN?: number;
  // leadingBlanksN?: number;
}

export interface PresetHooks {
  transformTrigger?: (options: ElementTriggerOptions) => ElementTriggerOptions;
}

export interface StaticSequencePreset {
  type: "static";
  sequence: (config: PresetGeneratorConfig) => ElementGroup[];
}

export interface StaticStepPreset {
  type: "static";
  step: (config: PresetGeneratorConfig) => ElementGroup[][];
}

export interface DynamicSequencePreset {
  type: "dynamic";
  sequence: (config: PresetGeneratorConfig) => () => ElementGroup[];
}

export interface DynamicStepPreset {
  type: "dynamic";
  step: (config: PresetGeneratorConfig) => Array<() => ElementGroup[]>;
}

export type ElementSequenceAddon = {
  hooks?: PresetHooks;
  options?: PresetOptions;
};

export type ElementSequencePreset = (
  | StaticSequencePreset
  | StaticStepPreset
  | DynamicSequencePreset
  | DynamicStepPreset
) &
  ElementSequenceAddon;
