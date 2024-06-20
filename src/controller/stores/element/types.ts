import { LayoutCategories } from "@/controller/config";
import { PresetHooks } from "@/controller/sequence/types";

export interface ElementTriggerOptions {
  transition?: number;
  color?: string;
  ease?: [number, number, number, number];
}

export type ElementBindCallback = (options: ElementTriggerOptions) => void;

export interface ElementBind {
  x: number;
  y: number;
  callback: ElementBindCallback;
}

export interface Element extends ElementBind {
  id: string;
}

export interface ElementActionGroup extends ElementTriggerOptions {
  groups: Array<Element & ElementTriggerOptions>;
  hooks?: PresetHooks;
}

export interface ElementSequenceStatic {
  type: "static";
  data: ElementActionGroup[][];
}

export interface ElementSequenceDynamic {
  type: "dynamic";
  data: Array<() => ElementActionGroup[]>;
}

export type ElementSequence = (
  | ElementSequenceStatic
  | ElementSequenceDynamic
) & { hooks?: PresetHooks };

export type ElementPresetMap = Record<string, ElementSequence>;

export interface ElementLayout {
  totalLength: number;
  elementArr: Element[][];
  elementMap: Record<string, number>;
}

type GenerateLayoutMapType<T> = {
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

export type ElementLayoutMap = GenerateLayoutMapType<LayoutCategories>;

export interface ElementStore {
  elementMap: Map<string, Map<string, Element>>;
  presetMap: ElementPresetMap | undefined;
  layoutMap: ElementLayoutMap | undefined;
}