import {
  ControllerSettings,
  ElementActionGroup,
  ElementBaseState,
} from "../types";

export const getAutoTransition = (settings: ControllerSettings) => {
  const { interval, repeat } = settings;
  const baseInterval = interval / (repeat * 0.6);
  return Number((baseInterval / 1000).toFixed(3));
};

export const getBatchDuration = (
  settings: ControllerSettings,
  length: number,
) => {
  const { interval, repeat } = settings;
  if (repeat > 1) {
    return interval / length;
  } else {
    return interval / repeat / length;
  }
};

export const triggerAction = (
  action: ElementActionGroup,
  state: ElementBaseState,
) => {
  for (const element of action.groups) {
    const _state: ElementBaseState = {
      transition: action.transition || state.transition,
      color: action.color || element.color || state.color,
    };

    element.callback(_state);
  }
};
