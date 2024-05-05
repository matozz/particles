import { ControllerSettings, ElementActionGroups } from "@/core/controller";

import { expandArray, getTransition } from "./utils";

export type RepeaterPreset = {
  data: (
    actionGroups: ElementActionGroups,
    settings: ControllerSettings,
  ) => ElementActionGroups;
};

export const repeaterPresets: Record<string, RepeaterPreset> = {
  static: {
    data: (actionGroups, settings) => {
      const { data: repeat } = settings.repeater;
      const { tempo } = settings;
      if (repeat < 2) {
        const transition = getTransition(tempo);
        return actionGroups.map((group) => ({ ...group, transition }));
      }
      const transition = getTransition(tempo, repeat);
      return expandArray(actionGroups, repeat).map((group) => ({
        ...group,
        transition,
      }));
    },
  },
};
