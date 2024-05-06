import { BasePresetSetting } from "@/core/controller";

import { getGradientColors } from "./utils";

export const colorPresets: Record<string, BasePresetSetting> = {
  static: {
    data: (config, settings) => {
      const { data: colors } = settings.color;
      const { actionGroups } = config;

      config.actionGroups = actionGroups.map(({ groups }) => ({
        color: colors[0],
        groups,
      }));

      return config;
    },
  },
  gradient: {
    data: (config, settings) => {
      const { data: colors } = settings.color;
      const { actionGroups } = config;

      if (colors.length > 1) {
        const maxOffset = actionGroups.length;
        const gradientColors = getGradientColors(colors, maxOffset + 1);

        config.actionGroups = actionGroups.map(({ groups }, i) => ({
          color: gradientColors[i],
          groups,
        }));
      } else {
        config.actionGroups = actionGroups.map(({ groups }) => ({
          color: colors[0],
          groups,
        }));
      }

      return config;
    },
  },
};
