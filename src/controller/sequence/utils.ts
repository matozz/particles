import type {
  Element,
  ElementLayoutMap,
  ElementPresetMap,
  ElementTriggerOptions,
} from "../stores/element/types";
import type { PresetExtraOptions } from "./types";
import { sequencePresets } from ".";

export const generatePresetMap = (
  elements: Element[],
  layoutMap: ElementLayoutMap,
  options?: PresetExtraOptions,
) =>
  Object.entries(sequencePresets).reduce<ElementPresetMap>((acc, cur) => {
    const [key, preset] = cur;

    if (preset.type === "static") {
      if ("sequence" in preset) {
        acc[key] = {
          type: preset.type,
          data: {
            groups: [preset.sequence?.({ elements, layoutMap, options })],
          },
        };
      } else {
        acc[key] = {
          type: preset.type,
          data: {
            groups: preset.step?.({ elements, layoutMap, options }),
          },
        };
      }
    } else {
      if ("sequence" in preset) {
        acc[key] = {
          type: preset.type,
          data: {
            groups: [preset.sequence?.({ elements, layoutMap, options })],
          },
        };
      } else {
        acc[key] = {
          type: preset.type,
          data: {
            groups: preset.step?.({ elements, layoutMap, options }),
          },
        };
      }
    }

    if (preset.hooks && Object.keys(preset.hooks).length > 0) {
      acc[key].data.hooks = preset.hooks;
    }

    if (preset.options && Object.keys(preset.options).length > 0) {
      acc[key].data.options = preset.options;
    }

    return acc;
  }, {});

// function declaration to avoid temporal dead zones and function hoisting.
export function createTransformHook(config: { transitionMultiplier?: number }) {
  const { transitionMultiplier } = config;

  if (!transitionMultiplier) {
    return function (options: ElementTriggerOptions) {
      return options;
    };
  }

  return function (options: ElementTriggerOptions) {
    const newOptions = { ...options };

    if (newOptions.transition) {
      newOptions.transition *= Math.abs(transitionMultiplier ?? 1);
    }

    return newOptions;
  };
}
