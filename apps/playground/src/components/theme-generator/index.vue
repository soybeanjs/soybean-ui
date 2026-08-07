<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { colord } from '@soybeanjs/colord';
import { tailwindPalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import {
  THEME_RADIUS,
  THEME_SIZE,
  builtinBasePresetKeys,
  builtinPrimaryPresetKeys,
  createTheme,
  themeRadiusKeys,
  themeSizeKeys
} from '@soybeanjs/theme';
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
import {
  SButton,
  SButtonIcon,
  SColorSwatch,
  SInput,
  SLabel,
  SPopover,
  SSegment,
  SSelect,
  SSlider,
  STabs,
  useTheme
} from '@soybeanjs/ui';
import type { SegmentOptionData, SelectOptionData, TabsOptionData } from '@soybeanjs/ui';
import ColorDecoration from './color-decoration.vue';

type Emits = {
  (e: 'getCss', value: ThemeCssVariables): void;
};

const emit = defineEmits<Emits>();

const isMobile = useMediaQuery('(max-width: 768px)');

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

// —— 可选项 ——
const baseOptions: SelectOptionData<BaseColorKey>[] = builtinBasePresetKeys.map(key => ({ label: key, value: key }));
const primaryOptions: SelectOptionData<PrimaryColorKey>[] = builtinPrimaryPresetKeys.map(key => ({
  label: key,
  value: key
}));
// Radius / Size 是离散 token，用滑块时映射到索引
const radiusIndex = (v: ThemeRadius): number => themeRadiusKeys.indexOf(v);
const radiusFromIndex = (i: number): ThemeRadius => themeRadiusKeys[i] ?? 'md';
const sizeIndex = (v: ThemeSize): number => themeSizeKeys.indexOf(v);
const sizeFromIndex = (i: number): ThemeSize => themeSizeKeys[i] ?? 'md';
// 展示具体数值：Size 为字号 px，Radius 由 rem 换算为 px（1rem = 16px）
const sizeLabel = (v: ThemeSize): string => `${THEME_SIZE[v]}px`;
const radiusLabel = (v: ThemeRadius): string => `${THEME_RADIUS[v]}`;
const lightLevels: LightLevelOffset[] = [0, 1, 2];
const darkLevels: DarkLevelOffset[] = [0, 1, 2, 3];
const menuColors: MenuColor[] = ['default', 'inverted', 'default-translucent', 'inverted-translucent'];
const menuAccents: MenuAccent[] = ['subtle', 'bold'];
const menuColorOptions: SelectOptionData<MenuColor>[] = menuColors.map(m => ({ label: m, value: m }));
const menuAccentOptions: SelectOptionData<MenuAccent>[] = menuAccents.map(a => ({ label: a, value: a }));
const paletteLevels: PaletteColorLevel[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const chartKeys: ColorKey[] = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'];
const modeOptions: SegmentOptionData<'light' | 'dark'>[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
];

const tabs = [
  { label: 'Generate Theme', value: 'generate-theme' },
  { label: 'Edit Variables', value: 'edit-variables' }
] as const satisfies TabsOptionData[];

// —— Surfaces（Main / Card / Sidebar：white → 50…950 → black 全色阶）——
type ShadeValue = 'white' | 'black' | PaletteColorLevel;
type SurfaceKey = 'background' | 'card' | 'sidebar';
const shadeValues: ShadeValue[] = ['white', 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 'black'];
const surfaces: { key: SurfaceKey; label: string }[] = [
  { key: 'background', label: 'Main' },
  { key: 'card', label: 'Card' },
  { key: 'sidebar', label: 'Sidebar' }
];

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

/** 各 surface token 在 light/dark 下的可选色阶表，与 theme 的派生规则一致 */
const surfaceLevelTables: Record<'light' | 'dark', Record<SurfaceKey, ShadeValue[]>> = {
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

/** 参照 theme 派生：按模式 + level offset 得到默认 level */
const surfaceDefault = (key: SurfaceKey): ShadeValue => {
  const table = surfaceLevelTables[activeMode.value][key];
  const offset = activeMode.value === 'light' ? lightLevel.value : darkLevel.value;

  return table[Math.min(offset, table.length - 1)];
};

/** 首选 token 解析值；解析不出时回退到 theme 派生的默认 level */
const surfaceValue = (key: SurfaceKey): ShadeValue => surfaceValueExact(key) ?? surfaceDefault(key);

const shadeToColor = (shade: ShadeValue): ColorValue => {
  if (shade === 'white' || shade === 'black') {
    return shade;
  }

  return `${base.value}.${shade}`;
};

/** 色阶 → 具体颜色，用于 swatch / 预览 */
const shadeColor = (shade: ShadeValue): string => {
  if (shade === 'white') {
    return '#ffffff';
  }

  if (shade === 'black') {
    return '#000000';
  }

  return tailwindPalette[base.value][shade].hsl;
};

const setSurface = (key: SurfaceKey, shade: ShadeValue): void => {
  patchColors({ [key]: shadeToColor(shade) });
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
const parseBorderAlpha = (value: string): number | undefined => {
  const match = value.match(/\/\s*([\d.]+)\)$/);

  return match ? Math.round(Number(match[1]) * 100) : undefined;
};

const borderOpacity = computed<number>(() => parseBorderAlpha(tokenValue('border')) ?? 12.5);

const setBorderOpacity = (opacity: number): void => {
  const alpha = opacity / 100;
  const level: PaletteColorLevel = activeMode.value === 'light' ? 950 : 50;
  const color = colord(tailwindPalette[base.value][level].hsl).alpha(alpha).toHslString() as ColorValue;

  patchColors({ border: color, input: color });
};

// —— Charts（palette + level）——
const parsePaletteKey = (value: string): { key: TailwindPaletteKey; level: PaletteColorLevel } | undefined => {
  const [key, level] = value.split('.');
  const parsedLevel = Number(level) as PaletteColorLevel;

  if (key && tailwindPalette[key as TailwindPaletteKey] && paletteLevels.includes(parsedLevel)) {
    return { key: key as TailwindPaletteKey, level: parsedLevel };
  }

  return undefined;
};

const chartPalette = (index: number): TailwindPaletteKey =>
  parsePaletteKey(tokenValue(chartKeys[index]))?.key ?? primary.value;
const chartLevel = (index: number): PaletteColorLevel => parsePaletteKey(tokenValue(chartKeys[index]))?.level ?? 300;

const setChart = (index: number, key: TailwindPaletteKey, level: PaletteColorLevel): void => {
  patchColors({ [chartKeys[index]]: `${key}.${level}` });
};

// —— Edit Variables：token 输入 + 色板预览 ——
const swatchColor = (value: string): string => {
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

const onTokenInput = (key: ColorKey, value: string): void => {
  patchColors({ [key]: value.trim() as ColorValue });
};

const tokenGroups: { label: string; keys: ColorKey[] }[] = [
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

/** 把 `createTheme` 的完整 CSS 拆分为 base / light / dark 三个原始片段 */
const splitThemeCss = (css: string): ThemeCssVariables => {
  const blocks = [...css.matchAll(/\{([\s\S]*?)\}/g)].map(match => match[1].trim());

  return {
    base: blocks[0] ?? '',
    light: blocks[1] ?? '',
    dark: blocks[2] ?? ''
  };
};

const rawCss = computed<ThemeCssVariables>(() => splitThemeCss(createTheme(themeOptions.value)));

// 状态变化时以 `{ base, light, dark }` 形式输出，ConfigProvider 收到后直接使用 raw css。
watch(rawCss, css => {
  emit('getCss', css);
});
</script>

<template>
  <SPopover :modal="false" :placement="isMobile ? 'left' : 'bottom-end'">
    <template #trigger>
      <SButtonIcon icon="lucide:swatch-book" size="lg" />
    </template>
    <div class="w-[min(90vw,26rem)]">
      <div class="grid space-y-1">
        <h1 class="text-md text-foreground font-semibold">Theme Generator</h1>
        <p class="text-xs text-muted-foreground">Generate a full ConfigProvider theme config.</p>
      </div>

      <div class="flex items-center justify-end pt-4">
        <SSegment v-model="activeMode" :items="modeOptions" size="sm" />
      </div>

      <STabs default-value="generate-theme" :items="tabs" class="pt-2">
        <template #content="{ value }">
          <!-- Generate Theme -->
          <div v-if="value === 'generate-theme'" class="max-h-[60vh] space-y-5 overflow-auto px-2 pt-4">
            <div class="space-y-1.5">
              <SLabel class="text-xs">Base Color</SLabel>
              <SSelect v-model="base" :items="baseOptions" class="w-full">
                <template #trigger-leading>
                  <ColorDecoration :palette="base" />
                </template>
                <template #item-leading="{ item }">
                  <ColorDecoration :palette="item.value" />
                </template>
              </SSelect>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Primary</SLabel>
              <SSelect v-model="primary" :items="primaryOptions" class="w-full">
                <template #trigger-leading>
                  <ColorDecoration :palette="primary" />
                </template>
                <template #item-leading="{ item }">
                  <ColorDecoration :palette="item.value" />
                </template>
              </SSelect>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Size</SLabel>
              <div class="flex items-center gap-3 pt-1">
                <SSlider
                  :model-value="[sizeIndex(size)]"
                  :min="0"
                  :max="themeSizeKeys.length - 1"
                  :step="1"
                  class="w-full"
                  @update:model-value="value => patchPreset({ size: sizeFromIndex(value[0]) })"
                />
                <span class="w-15 shrink-0 text-right text-xs text-muted-foreground">{{ sizeLabel(size) }}</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Radius</SLabel>
              <div class="flex items-center gap-3 pt-1">
                <SSlider
                  :model-value="[radiusIndex(radius)]"
                  :min="0"
                  :max="themeRadiusKeys.length - 1"
                  :step="1"
                  class="w-full"
                  @update:model-value="value => patchPreset({ radius: radiusFromIndex(value[0]) })"
                />
                <span class="w-15 shrink-0 text-right text-xs text-muted-foreground">{{ radiusLabel(radius) }}</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Light Level</SLabel>
              <div class="grid grid-cols-3 gap-2 py-1.5">
                <SButton
                  v-for="(l, index) in lightLevels"
                  :key="index"
                  :variant="l === lightLevel ? 'outline' : 'pure'"
                  size="sm"
                  @click="patchTopLevel({ lightLevel: l })"
                >
                  <span class="text-xs">{{ l }}</span>
                </SButton>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Dark Level</SLabel>
              <div class="grid grid-cols-4 gap-2 py-1.5">
                <SButton
                  v-for="(l, index) in darkLevels"
                  :key="index"
                  :variant="l === darkLevel ? 'outline' : 'pure'"
                  size="sm"
                  @click="patchTopLevel({ darkLevel: l })"
                >
                  <span class="text-xs">{{ l }}</span>
                </SButton>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Background Shades</SLabel>
              <div v-for="s in surfaces" :key="s.key" class="flex-y-center justify-between gap-4 pt-1">
                <span class="text-xs text-muted-foreground">{{ s.label }}</span>
                <div class="flex items-center gap-1">
                  <SButtonIcon
                    icon="lucide:minus"
                    size="sm"
                    :disabled="shadeIndex(s.key) <= 0"
                    @click="stepSurface(s.key, -1)"
                  />
                  <SSelect
                    :model-value="surfaceValue(s.key)"
                    :items="
                      shadeValues.map(shade => ({
                        label: String(shade),
                        value: shade
                      })) as SelectOptionData<ShadeValue>[]
                    "
                    :show-trigger-icon="false"
                    class="w-24"
                    @update:model-value="value => setSurface(s.key, value)"
                  >
                    <template #trigger-leading>
                      <SColorSwatch :color="shadeColor(surfaceValue(s.key))" shape="circle" size="xs" />
                    </template>
                    <template #item-leading="{ item }">
                      <SColorSwatch :color="shadeColor(item.value)" shape="circle" size="xs" />
                    </template>
                  </SSelect>
                  <SButtonIcon
                    icon="lucide:plus"
                    size="sm"
                    :disabled="shadeIndex(s.key) >= shadeValues.length - 1"
                    @click="stepSurface(s.key, 1)"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Border Opacity</SLabel>
              <div class="flex items-center gap-3 pt-1">
                <SSlider
                  :model-value="[borderOpacity]"
                  :min="0"
                  :max="100"
                  :step="1"
                  class="w-full"
                  @update:model-value="value => setBorderOpacity(value[0])"
                />
                <span class="w-10 shrink-0 text-right text-xs text-muted-foreground">{{ borderOpacity }}%</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Charts</SLabel>
              <div v-for="(key, index) in chartKeys" :key="key" class="space-y-1 pt-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-muted-foreground">{{ key }}</span>
                </div>
                <div class="flex gap-2">
                  <SSelect
                    :model-value="chartPalette(index)"
                    :items="primaryOptions"
                    class="flex-1"
                    @update:model-value="value => setChart(index, value, chartLevel(index))"
                  >
                    <template #trigger-leading>
                      <ColorDecoration :palette="chartPalette(index)" />
                    </template>
                    <template #item-leading="{ item }">
                      <ColorDecoration :palette="item.value" />
                    </template>
                  </SSelect>
                  <SSelect
                    :model-value="chartLevel(index)"
                    :items="paletteLevels.map(level => ({ label: String(level), value: level }))"
                    class="w-24"
                    @update:model-value="value => setChart(index, chartPalette(index), value)"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Menu Color</SLabel>
              <SSelect v-model="menuColor" :items="menuColorOptions" class="w-full" />
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Menu Accent</SLabel>
              <SSelect v-model="menuAccent" :items="menuAccentOptions" class="w-full" />
            </div>
          </div>

          <!-- Edit Variables -->
          <div v-else class="max-h-[60vh] space-y-5 overflow-auto px-2 pt-4">
            <div v-for="group in tokenGroups" :key="group.label" class="space-y-1.5">
              <SLabel class="text-xs">{{ group.label }}</SLabel>
              <div
                v-for="key in group.keys"
                :key="key"
                class="grid grid-cols-[1.5rem_7rem_1fr] items-center gap-2 py-0.5"
              >
                <SColorSwatch :color="swatchColor(tokenValue(key))" shape="circle" size="sm" />
                <span class="truncate text-xs text-muted-foreground">{{ key }}</span>
                <SInput
                  :model-value="tokenValue(key)"
                  size="sm"
                  placeholder="e.g. zinc.900 / hsl(...)"
                  @update:model-value="value => onTokenInput(key, value)"
                />
              </div>
            </div>
          </div>
        </template>
      </STabs>
    </div>
  </SPopover>
</template>
