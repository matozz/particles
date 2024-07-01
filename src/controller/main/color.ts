import { BaseDirection } from "../config";
import { useControllerStore } from "../stores/controller";
import { useElementStore } from "../stores/element";
import type { ElementChain } from "../stores/element/types";
import { generateGradientColors } from "../utils/color_helper";
import { filterOriginalActions } from "../utils/repeat_helper";

export const handleColor = (chain: ElementChain): ElementChain => {
  const settings = useControllerStore.getState().settings;
  const layoutMap = useElementStore.getState().layoutMap;

  const repeat = settings.repeat;
  const colorMode = settings.color.mode;
  const { colors } = settings.color.data;

  if (colors.length === 0) {
    return chain;
  }

  const { actions } = chain;

  const defaultActions = actions.map((action) => ({
    ...action,
    options: { color: colors[0] },
  }));

  if (colors.length === 1) {
    return { ...chain, actions: defaultActions };
  }

  if (colorMode === "gradient-auto") {
    const fileredActions = filterOriginalActions(actions, repeat);
    const gradients = generateGradientColors(
      colors,
      fileredActions.length,
      repeat,
    );
    const newActions = actions.map((action, i) => ({
      ...action,
      options: { color: gradients[i] },
    }));
    return { ...chain, actions: newActions };
  }

  if (colorMode === "gradient-layout") {
    const layout = layoutMap?.flow[BaseDirection.LeftRight];
    if (layout) {
      const gradients = generateGradientColors(colors, layout.totalLength);
      const newActions = actions.map((action) => ({
        ...action,
        group: action.group.map((element) => {
          const colorIdx = layout.elementMap[element.id] ?? 0;
          return { ...element, color: gradients[colorIdx] };
        }),
      }));
      return { ...chain, actions: newActions };
    }
  }

  return { ...chain, actions: defaultActions };
};
