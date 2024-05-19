import {
  ControllerExtraSettings,
  ControllerSettings,
  ControllerStore,
} from "../types";
import { mergeState } from "./store_common";

export const getTempoSetting = (tempo: number) => {
  const interval = Math.round((60 / tempo) * 1000);
  return { tempo, interval };
};

export const mergeSettings = (
  state: ControllerStore,
  settings: Partial<ControllerSettings>,
) => mergeState(state, { settings: { ...state.settings, ...settings } });

export function getExtraSetting<K extends keyof ControllerExtraSettings>(
  field: K,
  options: { mode?: string; data?: ControllerExtraSettings[K]["data"] },
) {
  const { mode, data } = options;
  return {
    [field]: { mode, data },
  } as { [P in K]: ControllerExtraSettings[K] };
}
