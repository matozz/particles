import Color from "color";

export const getColorHex = (color: string, brightness = 50) =>
  Color(color).lightness(brightness).hex();

export const getGradientColors = (colors: string[], steps: number) => {
  const gradient = [];
  const sectionSteps = Math.floor(steps / (colors.length - 1));

  for (let i = 0; i < colors.length - 1; i++) {
    const startColor = Color(colors[i]);
    const endColor = Color(colors[i + 1]);

    for (let step = 0; step < sectionSteps; step++) {
      const factor = step / sectionSteps;
      const gradientColor = startColor.mix(endColor, factor).hex();
      gradient.push(gradientColor);
    }
  }

  gradient.push(colors[colors.length - 1]);

  return gradient;
};
