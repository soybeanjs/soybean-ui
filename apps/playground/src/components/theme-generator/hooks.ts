import { computed, ref, watch } from 'vue';
import { colord } from '@soybeanjs/colord';
import { tailwindPalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import { createTheme } from '@soybeanjs/theme';
import type {
  BaseColorKey,
  ColorKey,
  ColorTokens,
  ColorValue,
  DarkLevelOffset,
  LightLevelOffset,
  MenuAccent,
  MenuColor,
  PrimaryColorKey,
  ThemeCssVariables,
  ThemeOptions,
  ThemePreset,
  ThemeRadius,
  ThemeSize
} from '@soybeanjs/theme';
import { useTheme } from '@soybeanjs/ui';
import {
  chartKeys,
  paletteLevels,
  parseBorderAlpha,
  parsePaletteKey,
  shadeToColor,
  shadeValues,
  splitThemeCss,
  surfaceLevelTables
} from './shared';
import type { ShadeValue, SurfaceKey } from './shared';

type UseThemeGeneratorEmits = {
  (e: 'getCss', value: ThemeCssVariables): void;
};

export function useThemeGenerator(emit: UseThemeGeneratorEmits) {
  // —— 可编辑状态（自包含）：初始值取自 provider 派生主题，此后完全由内部状态驱动 ——
  const fallbackTheme = useTheme('ThemeGenerator').theme;
  const fallbackPreset = (fallbackTheme.value.preset ?? {}) as ThemePreset;

  const base = ref<BaseColorKey>(fallbackTheme.value.base ?? 'zinc');
  const primary = ref<PrimaryColorKey>(fallbackTheme.value.primary ?? 'indigo');
  const radius = ref<ThemeRadius>((fallbackPreset.radius as ThemeRadius) ?? 'md');
  const size = ref<ThemeSize>((fallbackPreset.size as ThemeSize) ?? 'md');
  const lightLevel = ref<LightLevelOffset>(fallbackTheme.value.lightLevel ?? 0);
  const darkLevel = ref<DarkLevelOffset>(fallbackTheme.value.darkLevel ?? 0);
  const menuColor = ref<MenuColor>(fallbackPreset.menuColor ?? 'default');
  const menuAccent = ref<MenuAccent>(fallbackPreset.menuAccent ?? 'subtle');
  const lightTokens = ref<Partial<ColorTokens>>({ ...(fallbackPreset.light as Partial<ColorTokens>) });
  const darkTokens = ref<Partial<ColorTokens>>({ ...(fallbackPreset.dark as Partial<ColorTokens>) });

  // —— 编辑分片（light / dark），决定 Surfaces / Border / Charts / token 写哪个分片 ——
  const activeMode = ref<'light' | 'dark'>('light');

  // —— emit helpers（直接改内部状态，输出由 rawCss 统一派生）——
  const patchTopLevel = (patch: Partial<Pick<ThemeOptions, 'lightLevel' | 'darkLevel'>>): void => {
    if (patch.lightLevel !== undefined) lightLevel.value = patch.lightLevel;
    if (patch.darkLevel !== undefined) darkLevel.value = patch.darkLevel;
  };

  const patchPreset = (patch: Partial<Pick<ThemePreset, 'radius' | 'size' | 'menuColor' | 'menuAccent'>>): void => {
    if (patch.radius !== undefined) radius.value = patch.radius as ThemeRadius;
    if (patch.size !== undefined) size.value = patch.size as ThemeSize;
    if (patch.menuColor !== undefined) menuColor.value = patch.menuColor;
    if (patch.menuAccent !== undefined) menuAccent.value = patch.menuAccent;
  };

  const patchColors = (patch: Partial<Record<ColorKey, ColorValue | ''>>): void => {
    const target: Record<string, ColorValue> = {
      ...(activeMode.value === 'light' ? lightTokens.value : darkTokens.value)
    };

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete target[key];
      } else {
        target[key] = value;
      }
    }

    if (activeMode.value === 'light') {
      lightTokens.value = target;
    } else {
      darkTokens.value = target;
    }
  };

  const tokenValue = (key: ColorKey): string =>
    activeMode.value === 'light' ? (lightTokens.value[key] ?? '') : (darkTokens.value[key] ?? '');

  // —— Surfaces（Main / Card / Sidebar：white → 50…950 → black 全色阶）——
  const surfaceValueExact = (key: SurfaceKey): ShadeValue | undefined => {
    const value = tokenValue(key);

    if (value === 'white' || value === 'black') {
      return value;
    }

    const prefix = `${base.value}.`;

    if (value.startsWith(prefix)) {
      const level = Number(value.slice(prefix.length)) as PaletteColorLevel;

      if (paletteLevels.includes(level)) {
        return level;
      }
    }

    return undefined;
  };

  /** 参照 theme 派生：按模式 + level offset 得到默认 level */
  const surfaceDefault = (key: SurfaceKey): ShadeValue => {
    const table = surfaceLevelTables[activeMode.value][key];
    const offset = activeMode.value === 'light' ? lightLevel.value : darkLevel.value;

    return table[Math.min(offset, table.length - 1)];
  };

  /** 首选 token 解析值；解析不出时回退到 theme 派生的默认 level */
  const surfaceValue = (key: SurfaceKey): ShadeValue => surfaceValueExact(key) ?? surfaceDefault(key);

  const setSurface = (key: SurfaceKey, shade: ShadeValue): void => {
    patchColors({ [key]: shadeToColor(shade, base.value) });
  };

  const shadeIndex = (key: SurfaceKey): number => {
    const value = surfaceValue(key);

    return value === undefined ? -1 : shadeValues.indexOf(value);
  };

  /** 步进：delta 为 -1（减）或 +1（加），在色阶范围内前后移动 */
  const stepSurface = (key: SurfaceKey, delta: number): void => {
    const index = shadeIndex(key);
    const next = index === -1 ? undefined : shadeValues[index + delta];

    if (next !== undefined) {
      setSurface(key, next);
    }
  };

  // —— Border 透明度 ——
  const borderOpacity = computed<number>(() => parseBorderAlpha(tokenValue('border')) ?? 12.5);

  const setBorderOpacity = (opacity: number): void => {
    const alpha = opacity / 100;
    const level: PaletteColorLevel = activeMode.value === 'light' ? 950 : 50;
    const color = colord(tailwindPalette[base.value][level].hsl).alpha(alpha).toHslString() as ColorValue;

    patchColors({ border: color, input: color });
  };

  // —— Charts（palette + level）——
  const chartPalette = (index: number): TailwindPaletteKey =>
    parsePaletteKey(tokenValue(chartKeys[index]))?.key ?? primary.value;
  const chartLevel = (index: number): PaletteColorLevel => parsePaletteKey(tokenValue(chartKeys[index]))?.level ?? 300;

  const setChart = (index: number, key: TailwindPaletteKey, level: PaletteColorLevel): void => {
    patchColors({ [chartKeys[index]]: `${key}.${level}` });
  };

  // —— Edit Variables：token 输入 ——
  const onTokenInput = (key: ColorKey, value: string): void => {
    patchColors({ [key]: value.trim() as ColorValue });
  };

  // —— 输出：仅 raw css（`{ base, light, dark }`，即新增的 `css` 属性类型）——
  // 由内部状态派生完整主题 CSS，再拆分为三个原始片段，供 ConfigProvider 直接消费。
  const themeOptions = computed<ThemeOptions>(() => ({
    base: base.value,
    primary: primary.value,
    preset: {
      radius: radius.value,
      size: size.value,
      menuColor: menuColor.value,
      menuAccent: menuAccent.value,
      light: lightTokens.value,
      dark: darkTokens.value
    },
    format: 'hsl',
    lightLevel: lightLevel.value,
    darkLevel: darkLevel.value
  }));

  const rawCss = computed<ThemeCssVariables>(() => splitThemeCss(createTheme(themeOptions.value)));

  // 状态变化时以 `{ base, light, dark }` 形式输出，ConfigProvider 收到后直接使用 raw css。
  watch(rawCss, css => {
    emit('getCss', css);
  });

  return {
    activeMode,
    base,
    primary,
    radius,
    size,
    lightLevel,
    darkLevel,
    menuColor,
    menuAccent,
    borderOpacity,
    patchTopLevel,
    patchPreset,
    tokenValue,
    onTokenInput,
    surfaceValue,
    setSurface,
    shadeIndex,
    stepSurface,
    chartPalette,
    chartLevel,
    setChart,
    setBorderOpacity
  };
}
