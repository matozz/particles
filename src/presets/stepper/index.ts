import {
  BasePresetSetting,
  ElementActionGroups,
  usePluginStore,
} from "@/core/controller";

import { getTransition } from "../repeater/utils";
import { getActiveIdx, getActiveIdxList } from "./utils";

export const stepperPresets: Record<string, BasePresetSetting> = {
  none: {
    data: (config) => {
      const { actionGroups } = config;
      config.actionGroups = actionGroups.map((group) => group);
      return config;
    },
  },
  single: {
    data: (config, settings) => {
      const { tempo } = settings;
      const { actionGroups } = config;

      const position = usePluginStore.getState().position;

      const activeIdx = getActiveIdx(position, actionGroups.length);

      const transition = getTransition(tempo);

      config.actionGroups = [actionGroups[activeIdx]].map((group) => ({
        ...group,
        transition,
      }));

      return config;
    },
  },
  multiple: {
    data: (config, settings) => {
      const { actionGroups } = config;

      const position = usePluginStore.getState().position;

      const activeIdxList = getActiveIdxList(position, actionGroups.length, 1);

      config.actionGroups = actionGroups.reduce<ElementActionGroups>(
        (acc, cur, i) => {
          if (activeIdxList.includes(i)) {
            acc.push(cur);
          }
          return acc;
        },
        [],
      );

      return config;
    },
  },
};
