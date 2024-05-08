import { sequencePresets } from "../sequence";
import {
  ControllerExtraSettings,
  ControllerSettings,
  ControllerStore,
  ElementInfo,
  ElementSequenceMap,
  ElementStore,
} from "../types";
import { useControllerStore } from "./ControllerStore";

export const getElementExtraStates = (
  elementMap: Map<string, ElementInfo> | undefined,
): Pick<ElementStore, "elementList" | "sequenceMap"> => {
  if (!elementMap) {
    return { elementList: [], sequenceMap: {} };
  }
  const { options } = useControllerStore.getState().sequence;

  const elementList = Array.from(elementMap.values());
  const sequenceMap = Object.entries(
    sequencePresets,
  ).reduce<ElementSequenceMap>((acc, cur) => {
    const [key, { data }] = cur;
    acc[key] = data(elementList, options);
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
  interval: Math.round((60 / tempo) * 1000),
});

export const mergeSettings = (
  state: ControllerStore,
  settings: Partial<ControllerSettings>,
) => mergeState(state, { settings: { ...state.settings, ...settings } });

export function getExtraSetting<K extends keyof ControllerExtraSettings>(
  field: K,
  options: {
    mode?: string;
    data?: ControllerExtraSettings[K]["data"];
    fallback?: ControllerExtraSettings[K];
  },
): { [P in K]: ControllerExtraSettings[K] } {
  const { mode, data, fallback } = options;
  return {
    [field]: {
      mode: mode || fallback?.mode,
      data: data || fallback?.data,
    },
  } as { [P in K]: ControllerExtraSettings[K] };
}
