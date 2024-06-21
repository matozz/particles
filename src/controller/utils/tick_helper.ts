import { ControllerSettings } from "../stores/controller/types";
import {
  ElementTriggerOptions,
  ElementActionGroup,
} from "../stores/element/types";

export const getAutoTransition = (settings: ControllerSettings) => {
  const { interval, repeat } = settings;
  const baseInterval = interval / (repeat * 0.6);
  return Number((baseInterval / 1000).toFixed(3));
};

export const getBatchDuration = (
  settings: ControllerSettings,
  groupLength: number,
) => {
  const { interval, repeat } = settings;
  return repeat > 1
    ? interval / groupLength
    : interval / (repeat * groupLength);
};

export const triggerAction = (
  action: ElementActionGroup,
  triggerOptions: ElementTriggerOptions,
) => {
  const { groups, hooks } = action;

  for (const element of groups) {
    const { transition, color, ease } = element;

    let options: ElementTriggerOptions = {
      transition: transition || action.transition || triggerOptions.transition,
      color: color || action.color || triggerOptions.color,
      ease: ease || [0, 1, 0.4, 1],
    };

    const { transformTrigger } = hooks || {};

    if (typeof transformTrigger === "function") {
      options = transformTrigger(options);
    }

    element.callback(options);
  }
};

export const stoTrigger = (
  settings: ControllerSettings,
  actionGroups: ElementActionGroup[],
  onFrameCreate: (timerId: NodeJS.Timeout) => void,
) => {
  const autoTransition = getAutoTransition(settings);
  const batchDuration = getBatchDuration(settings, actionGroups.length);

  for (const [i, action] of actionGroups.entries()) {
    if (i === 0) {
      triggerAction(action, { transition: autoTransition });
    } else {
      const timerId = setTimeout(() => {
        triggerAction(action, { transition: autoTransition });
      }, batchDuration * i);
      onFrameCreate(timerId);
    }
  }
};

export const rafTrigger = (
  settings: ControllerSettings,
  actionGroups: ElementActionGroup[],
  onFrameCreate: (rafId: number) => void,
) => {
  const autoTransition = getAutoTransition(settings);
  const batchDuration = getBatchDuration(settings, actionGroups.length);

  let startTime: number | null = null;
  let lastActionIndex = 0;

  const callback: FrameRequestCallback = (time) => {
    if (startTime === null) {
      startTime = time;
    }

    const elapsed = time - startTime;
    const nextActionIndex = Math.floor(elapsed / batchDuration);

    while (
      lastActionIndex <= nextActionIndex &&
      lastActionIndex < actionGroups.length
    ) {
      triggerAction(actionGroups[lastActionIndex], {
        transition: autoTransition,
      });
      lastActionIndex++;
    }

    if (lastActionIndex < actionGroups.length) {
      const rafId = requestAnimationFrame(callback);
      onFrameCreate(rafId);
    }
  };

  const initialRafId = requestAnimationFrame(callback);
  onFrameCreate(initialRafId);
};
