import { useControllerStore } from "../stores";
import { ElementActionGroup } from "../types";
import { getGradientColors } from "./utils";

export const handleColor = (
  actionGroups: ElementActionGroup[],
): ElementActionGroup[] => {
  const settings = useControllerStore.getState().settings;
  const { mode, data: colors } = settings.color;

  if (colors.length === 0) {
    return actionGroups;
  }

  if (mode === "gradient") {
    if (colors.length > 1) {
      const maxOffset = actionGroups.length;
      const gradientColors = getGradientColors(colors, maxOffset + 1);

      return actionGroups.map(({ groups }, i) => ({
        color: gradientColors[i],
        groups,
      }));
    }
  }

  return actionGroups.map(({ groups }) => ({ color: colors[0], groups }));
};
