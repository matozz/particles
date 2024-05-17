import Color from "color";

import { repeatArray } from "./array";

export const getGradientColors = (
  colorArray: string[],
  numGradients: number,
  repeat = 1,
): string[] => {
  const gradients: string[] = [];

  if (numGradients <= 1) {
    return repeatArray([colorArray[0]], repeat);
  }

  const intervals = numGradients - 1;

  for (let step = 0; step <= intervals; step++) {
    const effectiveIndex = (step / intervals) * (colorArray.length - 1);
    const startIndex = Math.floor(effectiveIndex);
    const endIndex = Math.min(startIndex + 1, colorArray.length - 1);
    const stepFraction = effectiveIndex - startIndex;

    const startColor = Color(colorArray[startIndex]);
    const endColor = Color(colorArray[endIndex]);
    const gradientColor = startColor.mix(endColor, stepFraction).hex();

    gradients.push(gradientColor);
  }

  if (repeat > 1) {
    return repeatArray(gradients, repeat);
  }

  return gradients;
};
