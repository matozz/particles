import type { ElementSequenceAddon } from "../sequence/types";
import type { ControllerSettings } from "../stores/controller/types";
import type {
  ElementTriggerOptions,
  ElementAction,
  ElementChain,
} from "../stores/element/types";

export const calculateAutoTransition = (settings: ControllerSettings) => {
  const { interval, repeat } = settings;
  const baseInterval = interval / (repeat * 0.6);
  return Number((baseInterval / 1000).toFixed(3));
};

export const calculateBatchDuration = (
  settings: ControllerSettings,
  actions: ElementAction[],
) => {
  const { interval, repeat } = settings;

  return repeat > 1
    ? interval / actions.length
    : interval / (repeat * actions.length);
};

export const executeAction = (
  action: ElementAction,
  addons: ElementSequenceAddon,
  triggerOptions: ElementTriggerOptions,
) => {
  const { group, options: actionOptions } = action;

  for (const element of group) {
    const { transition, color, ease } = element;

    let options: ElementTriggerOptions = {
      transition:
        transition || actionOptions.transition || triggerOptions.transition,
      color: color || actionOptions.color || triggerOptions.color,
      ease: ease || [0, 1, 0.4, 1],
    };

    const { transformTrigger } = addons.hooks || {};

    if (typeof transformTrigger === "function") {
      options = transformTrigger(options);
    }

    element.callback(options);
  }
};

export const timeoutTrigger = (options: {
  settings: ControllerSettings;
  chain: ElementChain;
  onFrameCreate: (timerId: NodeJS.Timeout) => void;
}) => {
  const { settings, chain, onFrameCreate } = options;

  const { actions, ...addons } = chain;

  const autoTransition = calculateAutoTransition(settings);
  const batchDuration = calculateBatchDuration(settings, actions);

  for (const [i, action] of actions.entries()) {
    if (i === 0) {
      executeAction(action, addons, { transition: autoTransition });
    } else {
      const timerId = setTimeout(
        () => executeAction(action, addons, { transition: autoTransition }),
        batchDuration * i,
      );
      onFrameCreate(timerId);
    }
  }
};

export const requestAnimationFrameTrigger = (options: {
  settings: ControllerSettings;
  chain: ElementChain;
  onFrameCreate: (rafId: number) => void;
}) => {
  const { settings, chain, onFrameCreate } = options;

  const { actions, ...addons } = chain;

  const autoTransition = calculateAutoTransition(settings);
  const batchDuration = calculateBatchDuration(settings, actions);

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
      lastActionIndex < actions.length
    ) {
      executeAction(actions[lastActionIndex], addons, {
        transition: autoTransition,
      });
      lastActionIndex++;
    }

    if (lastActionIndex < actions.length) {
      const rafId = requestAnimationFrame(callback);
      onFrameCreate(rafId);
    }
  };

  const initialRafId = requestAnimationFrame(callback);
  onFrameCreate(initialRafId);
};
