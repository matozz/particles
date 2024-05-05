import { ControllerSettings, ElementActionGroups } from "@/core/controller";

import { getGradientColors } from "./utils";

export type ColorPreset = {
  data: (
    actionGroups: ElementActionGroups,
    settings: ControllerSettings,
  ) => ElementActionGroups;
};

export const colorPresets: Record<string, ColorPreset> = {
  static: {
    data: (actionGroups, settings) => {
      const { data: colors } = settings.color;
      return actionGroups.map(({ groups }) => ({ color: colors[0], groups }));
    },
  },
  gradient: {
    data: (actionGroups, settings) => {
      const { data: colors } = settings.color;
      if (colors.length > 1) {
        const maxOffset = actionGroups.length;
        const gradientColors = getGradientColors(colors, maxOffset + 1);

        return actionGroups.map(({ groups }, i) => ({
          color: gradientColors[i],
          groups,
        }));
      } else {
        return actionGroups.map(({ groups }) => ({ color: colors[0], groups }));
      }
    },
  },
};
