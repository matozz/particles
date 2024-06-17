import { useControllerStore } from "../stores/controller";
import { useElementStore } from "../stores/element";
import { ElementActionGroup } from "../stores/element/types";
import { getGradientColors } from "../utils/color_helper";
import { adjustOriginalActionGroups } from "../utils/repeat_helper";

export const handleColor = (
  actionGroups: ElementActionGroup[],
): ElementActionGroup[] => {
  const settings = useControllerStore.getState().settings;
  const layoutMap = useElementStore.getState().layoutMap;

  const repeat = settings.repeat;
  const colorMode = settings.color.mode;
  const { direction, colors } = settings.color.data;

  if (colors.length === 0) {
    return actionGroups;
  }

  const defaultActions = actionGroups.map((action) => ({
    ...action,
    color: colors[0],
  }));

  if (colors.length === 1) {
    return defaultActions;
  }

  if (colorMode === "gradient-auto") {
    const groups = adjustOriginalActionGroups(actionGroups, repeat);
    const gradients = getGradientColors(colors, groups.length, repeat);
    return actionGroups.map((action, i) => ({
      ...action,
      color: gradients[i],
    }));
  }

  if (colorMode === "gradient-layout") {
    const layout = direction ? layoutMap?.[direction] : null;
    if (layout) {
      const gradients = getGradientColors(colors, layout.totalLength);
      return actionGroups.map((action) => ({
        ...action,
        groups: action.groups.map((group) => {
          const colorIdx = layout.elementMap[group.id] ?? 0;
          return { ...group, color: gradients[colorIdx] };
        }),
      }));
    }
  }

  return defaultActions;
};
