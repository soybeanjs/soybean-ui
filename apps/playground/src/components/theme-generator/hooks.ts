import { computed, ref, watch } from 'vue';
import { colord } from '@soybeanjs/colord';
import { tailwindPalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import type {
  BaseColorKey,
  ColorKey,
  ColorTokens,
  ColorValue,
  DarkLevelOffset,
  LightLevelOffset,
  PrimaryColorKey,
  ThemeOverrides,
  ThemeRadius,
  ThemeSize
} from '@soybeanjs/theme';
import { useTheme } from '@soybeanjs/ui';
import type { ConfigProviderThemeOptions } from '@soybeanjs/ui';
import {
  chartKeys,
  paletteLevels,
  parseBorderAlpha,
  parsePaletteKey,
  shadeToColor,
  shadeValues,
  surfaceLevelTables
} from './shared';
import type { ShadeValue, SurfaceKey } from './shared';

export interface ThemeGeneratorProps {
  theme?: ConfigProviderThemeOptions;
}

export function useThemeGenerator(
  props: ThemeGeneratorProps,
  emit: (e: 'update:theme', value: ConfigProviderThemeOptions | undefined) => void
) {
  // —— 可编辑状态（自包含）：初始值取自 provider 派生主题，此后完全由内部状态驱动 ——
  const fallbackTheme = useTheme('ThemeGenerator').theme;
  const fallbackOverrides = (fallbackTheme.value.overrides ?? {}) as ThemeOverrides;

  const base = ref<BaseColorKey>(props.theme?.base ?? fallbackTheme.value.base ?? 'zinc');
  const primary = ref<PrimaryColorKey>(props.theme?.primary ?? fallbackTheme.value.primary ?? 'indigo');
  const radius = ref<ThemeRadius>((props.theme?.radius ?? fallbackTheme.value.radius ?? 'md') as ThemeRadius);
  const size = ref<ThemeSize>((props.theme?.size ?? fallbackTheme.value.size ?? 'md') as ThemeSize);
  const lightLevel = ref<LightLevelOffset>(props.theme?.lightLevel ?? fallbackTheme.value.lightLevel ?? 0);
  const darkLevel = ref<DarkLevelOffset>(props.theme?.darkLevel ?? fallbackTheme.value.darkLevel ?? 0);
  const lightTokens = ref<Partial<ColorTokens>>({ ...(props.theme?.overrides?.light ?? fallbackOverrides.light) });
  const darkTokens = ref<Partial<ColorTokens>>({ ...(props.theme?.overrides?.dark ?? fallbackOverrides.dark) });

  // —— 编辑分片（light / dark），决定 Surfaces / Border / Charts / token 写哪个分片 ——
  const activeMode = ref<'light' | 'dark'>('light');

  // —— emit helpers（直接改内部状态，输出由 themeOptions 统一派生）——
  const patchTopLevel = (patch: Partial<Pick<ConfigProviderThemeOptions, 'lightLevel' | 'darkLevel'>>): void => {
    if (patch.lightLevel !== undefined) lightLevel.value = patch.lightLevel;
    if (patch.darkLevel !== undefined) darkLevel.value = patch.darkLevel;
  };

  const patchBase = (patch: Partial<Pick<ConfigProviderThemeOptions, 'radius' | 'size'>>): void => {
    if (patch.radius !== undefined) radius.value = patch.radius as ThemeRadius;
    if (patch.size !== undefined) size.value = patch.size as ThemeSize;
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
    const color = colord(tailwindPalette[base.value as TailwindPaletteKey][level].hsl)
      .alpha(alpha)
      .toHslString() as ColorValue;

    patchColors({ border: color, input: color });
  };

  // —— Charts（palette + level）——
  const chartPalette = (index: number): TailwindPaletteKey =>
    parsePaletteKey(tokenValue(chartKeys[index]))?.key ?? (primary.value as TailwindPaletteKey);
  const chartLevel = (index: number): PaletteColorLevel => parsePaletteKey(tokenValue(chartKeys[index]))?.level ?? 300;

  const setChart = (index: number, key: PrimaryColorKey, level: PaletteColorLevel): void => {
    patchColors({ [chartKeys[index]]: `${key}.${level}` as ColorValue });
  };

  // —— Edit Variables：token 输入 ——
  const onTokenInput = (key: ColorKey, value: string): void => {
    patchColors({ [key]: value.trim() as ColorValue });
  };

  // —— 输出：完整 ThemeOptions（overrides + 顶层 base tokens），
  //    由内部状态派生，供 ConfigProvider 通过 `theme` prop 直接消费 ——
  const themeOptions = computed<ConfigProviderThemeOptions>(() => ({
    base: base.value,
    primary: primary.value,
    radius: radius.value,
    size: size.value,
    overrides: {
      light: lightTokens.value,
      dark: darkTokens.value
    },
    format: 'hsl',
    lightLevel: lightLevel.value,
    darkLevel: darkLevel.value
  }));

  // 状态变化时以完整 ThemeOptions 形式输出，父组件经 `v-model:theme` 消费。
  watch(themeOptions, value => {
    emit('update:theme', value);
  });

  return {
    activeMode,
    base,
    primary,
    radius,
    size,
    lightLevel,
    darkLevel,
    borderOpacity,
    patchTopLevel,
    patchBase,
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
