import { sequencePresets } from "@/presets";

import {
  ControllerPluginSettings,
  ControllerSettings,
  ControllerStore,
  ElementInfo,
  ElementSequenceMap,
  ElementStore,
} from "../types";

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

export const mergeState = <T>(state: T, values: Partial<T>): T => ({
  ...state,
  ...values,
});

export const getTempoSetting = (tempo: number) => ({
  tempo,
  interval: (60 / tempo) * 1000,
});

export const mergeSettings = (
  state: ControllerStore,
  settings: Partial<ControllerSettings>,
) => mergeState(state, { settings: { ...state.settings, ...settings } });

export function getPluginSetting<K extends keyof ControllerPluginSettings>(
  field: K,
  options: {
    mode?: string;
    data?: ControllerPluginSettings[K]["data"];
    fallback?: ControllerPluginSettings[K];
  },
): { [P in K]: ControllerPluginSettings[K] } {
  const { mode, data, fallback } = options;
  return {
    [field]: {
      mode: mode || fallback?.mode,
      data: data || fallback?.data,
    },
  } as { [P in K]: ControllerPluginSettings[K] };
}
