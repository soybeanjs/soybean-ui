import { COLOR_VARIABLES, EXTENDED_THEME_VARIABLES } from '@soybeanjs/theme';
import type { ColorFormat, ColorKey } from '@soybeanjs/theme';

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

const ALPHA_VARIABLE_BY_KEY: Partial<Record<ColorKey, string>> = {
  border: EXTENDED_THEME_VARIABLES.borderAlpha,
  input: EXTENDED_THEME_VARIABLES.inputAlpha,
  sidebarBorder: EXTENDED_THEME_VARIABLES.sidebarBorderAlpha
};

/** 输出 10 级色板的主题色（与 theme css 的 PALETTE_KEYS 对齐） */
const PALETTE_LEVELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const PALETTE_KEYS = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon'] as const;

/**
 * 从 `@soybeanjs/theme` 的 `COLOR_VARIABLES` 派生 UnoCSS theme.colors（kebab-case 键）。
 *
 * `@soybeanjs/theme` 的 token 是唯一权威；preset 只做适配，把变量名映射成
 * theme.colors，不另起一套 token。
 */
export function buildThemeColors(format: ColorFormat): Record<string, string> {
  const colors: Record<string, string> = {};

  for (const key of Object.keys(COLOR_VARIABLES) as ColorKey[]) {
    const variable = COLOR_VARIABLES[key];
    const alphaVariable = ALPHA_VARIABLE_BY_KEY[key];

    // chart1 → chart-1（与 CSS 变量 `--chart-1` 对齐）
    colors[kebabCase(key).replace(/(\d)$/, '-$1')] = alphaVariable
      ? alphaColorRef(variable, `var(${alphaVariable}, 1)`, format)
      : colorRef(variable, format);
  }

  for (const paletteKey of PALETTE_KEYS) {
    for (const level of PALETTE_LEVELS) {
      colors[`${paletteKey}-${level}`] = colorRef(`${COLOR_VARIABLES[paletteKey]}-${level}`, format);
    }
  }

  return colors;
}

export { colorRef, alphaColorRef };
