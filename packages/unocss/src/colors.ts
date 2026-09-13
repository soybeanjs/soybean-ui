import { ALPHA_COLOR_VARIABLES, COLOR_VARIABLES, PALETTE_COLOR_KEYS, paletteColorLevels } from '@vean/theme';
import type { ColorFormat, ColorKey } from '@vean/theme';

/** 'sidebarBorder' → 'sidebar-border'（camelCase token 键转 CSS 风格 kebab 键） */
function kebabCase(str: string): string {
  return str
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll(/[\s_]+/g, '-')
    .replaceAll(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

/** 颜色变量引用：hsl 存裸通道值需包函数 + var()，oklch 存完整函数串直接 var() */
function colorRef(variable: string, format: ColorFormat): string {
  return format === 'hsl' ? `hsl(var(${variable}))` : `var(${variable})`;
}

/** border 族在 hsl 下额外走 alpha 变量 */
function alphaColorRef(variable: string, alphaVariable: string, format: ColorFormat): string {
  return format === 'hsl' ? `hsl(var(${variable}) / ${alphaVariable})` : `var(${variable})`;
}

/**
 * 从 `@vean/theme` 的 `COLOR_VARIABLES` 派生 UnoCSS theme.colors（kebab-case 键）。
 *
 * `@vean/theme` 的 token 是唯一权威；preset 只做适配，把变量名映射成
 * theme.colors，不另起一套 token。
 */
export function buildThemeColors(format: ColorFormat): Record<string, string> {
  const colors: Record<string, string> = {};

  for (const key of Object.keys(COLOR_VARIABLES) as ColorKey[]) {
    const variable = COLOR_VARIABLES[key];
    const alphaVariable = ALPHA_COLOR_VARIABLES[key];

    // chart1 → chart-1（与 CSS 变量 `--chart-1` 对齐）
    colors[kebabCase(key).replace(/(\d)$/, '-$1')] = alphaVariable
      ? alphaColorRef(variable, `var(${alphaVariable}, 1)`, format)
      : colorRef(variable, format);
  }

  for (const paletteKey of PALETTE_COLOR_KEYS) {
    for (const level of paletteColorLevels) {
      colors[`${paletteKey}-${level}`] = colorRef(`${COLOR_VARIABLES[paletteKey]}-${level}`, format);
    }
  }

  return colors;
}

export { colorRef, alphaColorRef };
