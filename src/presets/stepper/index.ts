import { BasePresetSetting, usePluginStore } from "@/core/controller";

import { getTransition } from "../repeater/utils";

export const stepperPresets: Record<string, BasePresetSetting> = {
  single: {
    data: (config, settings) => {
      const { tempo } = settings;
      const { actionGroups } = config;

      const position = usePluginStore.getState().position;

      const activeIdx = (position - 1) % actionGroups.length;

      const transition = getTransition(tempo);

      config.actionGroups = [actionGroups[activeIdx]].map((group) => ({
        ...group,
        transition,
      }));

      return config;
    },
  },
};
