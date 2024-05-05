import { sequencePresets, colorPresets, repeaterPresets } from "@/presets";

import {
  ElementInfo,
  ElementStore,
  ElementSequenceMap,
  ControllerSettings,
  ElementActionGroups,
  ControllerStore,
  ControllerPluginSetting,
} from "./types";

export const getElementExtraStates = (
  elementMap: Map<string, ElementInfo> | undefined,
): Pick<ElementStore, "elementList" | "sequenceMap"> => {
  if (!elementMap) {
    return { elementList: [], sequenceMap: {} };
  }

  const elementList = Array.from(elementMap.values());

  const sequenceMap = Object.entries(
    sequencePresets,
  ).reduce<ElementSequenceMap>((acc, cur) => {
    const [key, { data }] = cur;
    acc[key] = data(elementList);
    return acc;
  }, {});

  return { elementList, sequenceMap };
};

export const getPluginActionGroups = (
  actionGroups: ElementActionGroups,
  settings: ControllerSettings,
) => {
  const { color, repeater } = settings;

  actionGroups = colorPresets[color.mode].data(actionGroups, settings);
  actionGroups = repeaterPresets[repeater.mode].data(actionGroups, settings);

  return actionGroups;
};

export const mergeState = <T>(state: T, values: Partial<T>): T => ({
  ...state,
  ...values,
});

export const mergeSettings = (
  state: ControllerStore,
  settings: Partial<ControllerSettings>,
) => mergeState(state, { settings: { ...state.settings, ...settings } });

export const getTempoSetting = (tempo: number) => ({
  tempo,
  interval: (60 / tempo) * 1000,
});

export function getColorSetting(
  mode: string,
  colors: string[],
): { color: ControllerPluginSetting<string[]> };
export function getColorSetting(
  mode: string | undefined,
  colors: string[] | undefined,
  fallback: ControllerPluginSetting<string[]>,
): { color: ControllerPluginSetting<string[]> };
export function getColorSetting(
  mode: string | undefined,
  colors: string[] | undefined,
  fallback?: ControllerPluginSetting<string[]>,
) {
  return {
    color: { mode: mode || fallback?.mode, data: colors || fallback?.data },
  };
}

export function getRepeaterSetting(
  mode: string,
  repeat: number,
): { repeater: ControllerPluginSetting<number> };
export function getRepeaterSetting(
  mode: string | undefined,
  repeat: number | undefined,
  fallback: ControllerPluginSetting<number>,
): { repeater: ControllerPluginSetting<number> };
export function getRepeaterSetting(
  mode: string | undefined,
  repeat: number | undefined,
  fallback?: ControllerPluginSetting<number>,
) {
  return {
    repeater: { mode: mode || fallback?.mode, data: repeat || fallback?.data },
  };
}
