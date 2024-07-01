import Color from "color";
import { repeatArray } from "./array";

export const generateGradientColors = (
  colors: string[],
  num: number,
  repeat = 1,
) => {
  const gradients: string[] = [];

  if (num <= 1) {
    return repeatArray([colors[0]], repeat);
  }

  const intervals = num - 1;

  for (let step = 0; step <= intervals; step++) {
    const effectiveIndex = (step / intervals) * (colors.length - 1);
    const startIndex = Math.floor(effectiveIndex);
    const endIndex = Math.min(startIndex + 1, colors.length - 1);
    const stepFraction = effectiveIndex - startIndex;

    const startColor = Color(colors[startIndex]);
    const endColor = Color(colors[endIndex]);
    const gradientColor = startColor.mix(endColor, stepFraction).hex();

    gradients.push(gradientColor);
  }

  if (repeat > 1) {
    return repeatArray(gradients, repeat);
  }

  return gradients;
};
