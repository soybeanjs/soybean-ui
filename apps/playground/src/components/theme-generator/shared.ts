import { tailwindPalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import {
  THEME_RADIUS,
  THEME_SIZE,
  builtinBasePresetKeys,
  builtinPrimaryPresetKeys,
  themeRadiusKeys,
  themeSizeKeys
} from '@soybeanjs/theme';
import type {
  BaseColorKey,
  ColorKey,
  ColorValue,
  DarkLevelOffset,
  LightLevelOffset,
  MenuAccent,
  MenuColor,
  PrimaryColorKey,
  ThemeRadius,
  ThemeSize
} from '@soybeanjs/theme';
import type { SegmentOptionData, SelectOptionData, TabsOptionData } from '@soybeanjs/ui';

// —— 类型 ——
export type ShadeValue = 'white' | 'black' | PaletteColorLevel;
export type SurfaceKey = 'background' | 'card' | 'sidebar';

// —— 常量 ——
export const lightLevels: LightLevelOffset[] = [0, 1, 2];
export const darkLevels: DarkLevelOffset[] = [0, 1, 2, 3];
export const menuColors: MenuColor[] = ['default', 'inverted', 'default-translucent', 'inverted-translucent'];
export const menuAccents: MenuAccent[] = ['subtle', 'bold'];
export const paletteLevels: PaletteColorLevel[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const chartKeys: ColorKey[] = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'];

export const shadeValues: ShadeValue[] = ['white', 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 'black'];
export const surfaces: { key: SurfaceKey; label: string }[] = [
  { key: 'background', label: 'Main' },
  { key: 'card', label: 'Card' },
  { key: 'sidebar', label: 'Sidebar' }
];

/** 各 surface token 在 light/dark 下的可选色阶表，与 theme 的派生规则一致 */
export const surfaceLevelTables: Record<'light' | 'dark', Record<SurfaceKey, ShadeValue[]>> = {
  light: {
    background: ['white', 50, 100, 200],
    card: ['white', 50, 100, 200],
    sidebar: ['white', 50, 100, 200]
  },
  dark: {
    background: [950, 900, 800, 700],
    card: [900, 800, 700, 600],
    sidebar: [900, 800, 700, 600]
  }
};

export const modeOptions: SegmentOptionData<'light' | 'dark'>[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
];

export const tabs = [
  { label: 'Generate Theme', value: 'generate-theme' },
  { label: 'Edit Variables', value: 'edit-variables' }
] as const satisfies TabsOptionData[];

export const tokenGroups: { label: string; keys: ColorKey[] }[] = [
  {
    label: 'Surfaces',
    keys: ['background', 'foreground', 'card', 'cardForeground', 'popover', 'popoverForeground']
  },
  {
    label: 'Palette',
    keys: [
      'primary',
      'primaryForeground',
      'secondary',
      'secondaryForeground',
      'muted',
      'mutedForeground',
      'accent',
      'accentForeground',
      'destructive',
      'destructiveForeground'
    ]
  },
  { label: 'Hairlines', keys: ['border', 'input', 'ring'] },
  {
    label: 'Sidebar',
    keys: [
      'sidebar',
      'sidebarForeground',
      'sidebarPrimary',
      'sidebarPrimaryForeground',
      'sidebarAccent',
      'sidebarAccentForeground',
      'sidebarBorder',
      'sidebarRing'
    ]
  },
  { label: 'Charts', keys: ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'] },
  {
    label: 'Feedback',
    keys: [
      'success',
      'successForeground',
      'warning',
      'warningForeground',
      'info',
      'infoForeground',
      'carbon',
      'carbonForeground'
    ]
  }
];

export const baseOptions: SelectOptionData<BaseColorKey>[] = builtinBasePresetKeys.map(key => ({
  label: key,
  value: key
}));
export const primaryOptions: SelectOptionData<PrimaryColorKey>[] = builtinPrimaryPresetKeys.map(key => ({
  label: key,
  value: key
}));
export const menuColorOptions: SelectOptionData<MenuColor>[] = menuColors.map(m => ({ label: m, value: m }));
export const menuAccentOptions: SelectOptionData<MenuAccent>[] = menuAccents.map(a => ({ label: a, value: a }));

// —— Radius / Size 离散 token 与索引、标签映射 ——
export const radiusIndex = (v: ThemeRadius): number => themeRadiusKeys.indexOf(v);
export const radiusFromIndex = (i: number): ThemeRadius => themeRadiusKeys[i] ?? 'md';
export const radiusLabel = (v: ThemeRadius): string => `${THEME_RADIUS[v]}`;
export const sizeIndex = (v: ThemeSize): number => themeSizeKeys.indexOf(v);
export const sizeFromIndex = (i: number): ThemeSize => themeSizeKeys[i] ?? 'md';
export const sizeLabel = (v: ThemeSize): string => `${THEME_SIZE[v]}px`;

/** 解析 `hsl(... / 0.125)` 尾部透明度为百分比；无法解析时返回 undefined */
export const parseBorderAlpha = (value: string): number | undefined => {
  const match = value.match(/\/\s*([\d.]+)\)$/);

  return match ? Math.round(Number(match[1]) * 100) : undefined;
};

export const parsePaletteKey = (value: string): { key: TailwindPaletteKey; level: PaletteColorLevel } | undefined => {
  const [key, level] = value.split('.');
  const parsedLevel = Number(level) as PaletteColorLevel;

  if (key && tailwindPalette[key as TailwindPaletteKey] && paletteLevels.includes(parsedLevel)) {
    return { key: key as TailwindPaletteKey, level: parsedLevel };
  }

  return undefined;
};

/** palette + level → 具体色值，用于 swatch / 预览 */
export const chatColor = (palette: TailwindPaletteKey, level: PaletteColorLevel): string =>
  tailwindPalette[palette][level].hsl;

/** 色阶 → 具体颜色，用于 swatch / 预览 */
export const shadeColor = (shade: ShadeValue, base: BaseColorKey): string => {
  if (shade === 'white') {
    return '#ffffff';
  }

  if (shade === 'black') {
    return '#000000';
  }

  return tailwindPalette[base as TailwindPaletteKey][shade].hsl;
};

export const shadeToColor = (shade: ShadeValue, base: BaseColorKey): ColorValue => {
  if (shade === 'white' || shade === 'black') {
    return shade;
  }

  return `${base}.${shade}` as ColorValue;
};

export const swatchColor = (value: string): string => {
  if (!value) {
    return 'transparent';
  }

  const parsed = parsePaletteKey(value);

  if (parsed) {
    return tailwindPalette[parsed.key][parsed.level].hsl;
  }

  if (value === 'white') {
    return '#ffffff';
  }

  if (value === 'black') {
    return '#000000';
  }

  return value;
};
