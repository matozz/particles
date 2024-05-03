import { sequencePresets } from "../sequence";
import { ElementInfo, ElementStore, ElementGroupMap } from "./types";

export const getElementExtraStates = (
  elementMap: Map<string, ElementInfo> | undefined,
): Pick<ElementStore, "elementList" | "elementGroupMap"> => {
  if (!elementMap) {
    return { elementList: [], elementGroupMap: {} };
  }

  const elementList = Array.from(elementMap.values());

  const elementGroupMap = sequencePresets.reduce<ElementGroupMap>(
    (acc, cur) => {
      const { key, data } = cur;
      acc[key] = data(elementList);
      return acc;
    },
    {},
  );

  return { elementList, elementGroupMap };
};

export const getTempoState = (tempo: number) => ({
  tempo,
  interval: (60 / tempo) * 1000,
});
