import { BasePresetSetting, usePluginStore } from "@/core/controller";

import { expandArray, getTransition } from "./utils";

export const repeaterPresets: Record<string, BasePresetSetting> = {
  static: {
    data: (config, settings) => {
      const { data: repeat } = settings.repeater;
      const { tempo } = settings;
      const { actionGroups } = config;

      const skipCount = usePluginStore.getState().skipCount;
      const setSkipCount = usePluginStore.getState().setSkipCount;
      const skip = usePluginStore.getState().skip;

      if (repeat < 2) {
        let transition = getTransition(tempo);

        if (repeat < 1) {
          transition = getTransition(tempo * repeat);
          if (skipCount === 0) {
            setSkipCount(1 / repeat - 1);
          } else {
            skip();
            config.skip = true;
          }
        }

        config.actionGroups = actionGroups.map((group) => ({
          ...group,
          transition,
        }));
      } else {
        const transition = getTransition(tempo, repeat);

        config.actionGroups = expandArray(actionGroups, repeat).map(
          (group) => ({ ...group, transition }),
        );
      }

      return config;
    },
  },
};
