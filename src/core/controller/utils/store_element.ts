import { sequencePresets } from "../sequence";
import {
  ElementInfo,
  ElementSequencePresetOptions,
  ElementStore,
  ElementPresetMap,
} from "../types";
import { getLayoutMap } from "./layout_generator";

export const getGenerateStates = (
  elementMap: Map<string, ElementInfo>,
  options: ElementSequencePresetOptions | undefined,
): Pick<ElementStore, "presetMap" | "layoutMap"> => {
  const elements = Array.from(elementMap.values());

  const layoutMap = getLayoutMap(elements);

  const presetMap = Object.entries(sequencePresets).reduce<ElementPresetMap>(
    (acc, cur) => {
      const [key, preset] = cur;

      if (preset.type === "static") {
        if ("sequence" in preset) {
          acc[key] = {
            type: preset.type,
            sequence: [preset.sequence?.({ elements, layoutMap, options })],
          };
        } else {
          acc[key] = {
            type: preset.type,
            sequence: preset.step?.({ elements, layoutMap, options }),
          };
        }
      } else {
        if ("sequence" in preset) {
          acc[key] = {
            type: preset.type,
            sequence: [preset.sequence?.({ elements, layoutMap, options })],
          };
        } else {
          acc[key] = {
            type: preset.type,
            sequence: preset.step?.({ elements, layoutMap, options }),
          };
        }
      }
      return acc;
    },
    {},
  );

  console.log("generating new elements...", elementMap);
  console.log("generating new presets...", presetMap);
  console.log("generating new layouts...", layoutMap);

  return { presetMap, layoutMap };
};
