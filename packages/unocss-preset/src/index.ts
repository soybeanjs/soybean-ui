import type { Preset } from '@unocss/core';
import type { Theme } from '@unocss/preset-uno';
import { getColorPalette } from '@soybeanjs/color-palette';
import type { ColorPaletteNumber } from '@soybeanjs/color-palette';
import { colord } from 'colord';

// const DEFAULT_THEME_COLOR = '#646cff';
const CSS_VAR_PREFIX = '--theme-color';

function getThemeColors() {
  const colors = {
    themeColor: {
      DEFAULT: `hsl(var(${CSS_VAR_PREFIX}))`
    } as NonNullable<Theme['colors']>
  } satisfies Theme['colors'];

  const colorPaletteNumbers: ColorPaletteNumber[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  colorPaletteNumbers.forEach(num => {
    colors.themeColor[num] = `hsl(var(${CSS_VAR_PREFIX}-${num}))`;
  });

  return colors;
}

function getCssVarsByColor(color: string) {
  const c = colord(color);

  if (!c.isValid()) {
    return {};
  }

  const colorPalette = getColorPalette(color);

  const mainHsl = colord(colorPalette.main.hex).toHsl();

  const css: Record<string, string> = {
    [CSS_VAR_PREFIX]: `${mainHsl.h} ${mainHsl.s}% ${mainHsl.l}%`
  };

  colorPalette.palettes.forEach(palette => {
    const hsl = colord(palette.hex).toHsl();

    css[`${CSS_VAR_PREFIX}-${palette.number}`] = `${hsl.h} ${hsl.s}% ${hsl.l}%`;
  });

  return css;
}

export function presetSoybeanUnify(): Preset<Theme> {
  const colors = getThemeColors();

  return {
    name: 'unocss-preset-soybean-unify',
    theme: {
      colors
    },
    rules: [[/^tc-(.+)$/, ([_, color]) => getCssVarsByColor(color)]]
  };
}
