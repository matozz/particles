import type { LayoutCategories } from "@/controller/config";
import type { ElementSequenceAddon } from "@/controller/sequence/types";

export interface ElementTriggerOptions {
  transition?: number;
  color?: string;
  ease?: [number, number, number, number];
}

export type ElementCallback = (options: ElementTriggerOptions) => void;

export interface ElementBase {
  x: number;
  y: number;
  callback: ElementCallback;
}

export interface Element extends ElementBase {
  id: string;
}

export type ElementGroup = Array<Element & ElementTriggerOptions>;

export interface ElementAction {
  group: ElementGroup;
  options: ElementTriggerOptions;
  beats: number;
}

export interface ElementChain extends ElementSequenceAddon {
  actions: ElementAction[];
}

export interface ElementSequenceStatic {
  type: "static";
  data: { groups: ElementGroup[][] } & ElementSequenceAddon;
}

export interface ElementSequenceDynamic {
  type: "dynamic";
  data: { groups: Array<() => ElementGroup[]> } & ElementSequenceAddon;
}

export type ElementSequence = ElementSequenceStatic | ElementSequenceDynamic;

export type ElementPresetMap = Record<string, ElementSequence>;

export interface ElementLayout {
  totalLength: number;
  elementArr: Element[][];
  elementMap: Record<string, number>;
}

type GenerateLayoutMap<T> = {
  [P in keyof T]: T[P] extends {
    direction: readonly string[];
    points?: readonly string[];
  }
    ? {
        [D in T[P]["direction"][number]]: T[P]["points"] extends readonly string[]
          ? { [BP in T[P]["points"][number]]: ElementLayout }
          : ElementLayout;
      }
    : never;
};

export type ElementLayoutMap = GenerateLayoutMap<LayoutCategories>;

export interface ElementStore {
  elementMap: Map<string, Map<string, Element>>;
  presetMap: ElementPresetMap | undefined;
  layoutMap: ElementLayoutMap | undefined;
}
