import { BaseDirection } from "../config";
import { useControllerStore } from "../stores/controller";
import { useElementStore } from "../stores/element";
import type {
  ElementAction,
  ElementChain,
  ElementGroup,
} from "../stores/element/types";
import {
  generateGradientColors,
  pickActionColors,
} from "../utils/color_helper";
import { filterOriginalActions } from "../utils/repeat_helper";

export const handleColor = (chain: ElementChain): ElementChain => {
  const settings = useControllerStore.getState().settings;
  const layoutMap = useElementStore.getState().layoutMap;

  const repeat = settings.repeat;
  const colorMode = settings.color.mode;
  const colorGroups = settings.color.data;

  if (colorGroups.length === 0) {
    return chain;
  }

  const { actions } = chain;

  const defaultActions = actions.map<ElementAction>((action) => {
    const colors = pickActionColors(colorGroups, action);
    return {
      ...action,
      options: { color: colors[0] || "#000000" },
    };
  });

  if (colorMode === "gradient-auto") {
    const fileredActions = filterOriginalActions(actions, repeat);

    const newActions = actions.map<ElementAction>((action, i) => {
      const colors = pickActionColors(colorGroups, action);
      const gradients = generateGradientColors(
        colors,
        fileredActions.length,
        repeat,
      );
      return {
        ...action,
        options: { color: gradients[i] },
      };
    });

    return { ...chain, actions: newActions };
  }

  if (colorMode === "gradient-layout") {
    const layout = layoutMap?.flow[BaseDirection.LeftRight];

    if (layout) {
      const newActions = actions.map<ElementAction>((action) => {
        const colors = pickActionColors(colorGroups, action);
        const gradients = generateGradientColors(colors, layout.totalLength);
        return {
          ...action,
          group: action.group.map<ElementGroup[number]>((element) => {
            const colorIdx = layout.elementMap[element.id] ?? 0;
            return {
              color: gradients[colorIdx],
              ...element, // element color has higher priority
            };
          }),
        };
      });

      return { ...chain, actions: newActions };
    }
  }

  return { ...chain, actions: defaultActions };
};
