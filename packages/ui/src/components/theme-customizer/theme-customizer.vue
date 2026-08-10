<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { THEME_RADIUS, themeRadiusKeys, themeSizeKeys } from '@soybeanjs/theme';
import type {
  BaseColorKey,
  ChartSchemeKey,
  ColorKey,
  ColorValue,
  DarkLevelOffset,
  FeedbackSchemeKey,
  LightLevelOffset,
  MenuAccent,
  MenuColor,
  PrimaryColorKey,
  SidebarSchemeKey,
  ThemeRadius,
  ThemeSize
} from '@soybeanjs/theme';
import type { SegmentOptionData, SelectOptionData, TabsOptionData } from '@soybeanjs/ui';
import { useThemeSettings } from '@/theme/use-theme-settings';
import { useThemeVariants } from '@/theme/use-theme-variants';
import SButton from '../button/button.vue';
import { useTheme } from '../config-provider/use-theme';
import SPalettePicker from '../palette-picker/palette-picker.vue';
import SSegment from '../segment/segment.vue';
import SSelect from '../select/select.vue';
import SSlider from '../slider/slider.vue';
import STabs from '../tabs/tabs.vue';
import ThemeModeSelect from '../theme-mode-select/theme-mode-select.vue';
import BasePaletteSelect from './base-palette-select.vue';
import ChartSchemaSelect from './chart-schema-select.vue';
import FeedbackSchemaSelect from './feedback-schema-select.vue';
import PrimaryPaletteSelect from './primary-palette-select.vue';
import SectionItem from './section-item.vue';
import SidebarSchemaSelect from './sidebar-schema-select.vue';
import type { ThemeCustomizerProps, ThemeCustomizerSection } from './types';
import { useThemeCustomizerLocale } from './use-locale';

defineOptions({
  name: 'SThemeCustomizer'
});

const props = withDefaults(defineProps<ThemeCustomizerProps>(), {
  sections: () => ['mode', 'palette', 'radius', 'size', 'scheme', 'advanced'],
  size: 'md',
  persist: true,
  showActions: true
});

// —— 文案国际化：跟随 ConfigProvider.locale，切换语言即时刷新 ——
const { resolveLabel: resolveBaseLabel, resolveOption } = useThemeCustomizerLocale();

const resolveLabel = (key: string): string => (props.labelResolver ? props.labelResolver(key) : resolveBaseLabel(key));

// —— 运行时主题上下文 ——
const theme = useTheme('ThemeCustomizer');

// —— 状态核心：初始化自当前主题，改动即时 commit 到运行时 ——
const settings = useThemeSettings({
  persist: props.persist,
  initial: {
    ...theme.theme.value,
    mode: theme.mode.value
  },
  apply: state => {
    theme.setThemeState(state);
  }
});

// —— 基础 token 绑定 ——
// mode 偏好由 <ThemeModeSelect> 直接绑定主题上下文，此处无需重复状态。
const baseValue = computed<BaseColorKey>({
  get: () => settings.state.value.base ?? 'zinc',
  set: value => settings.setState({ base: value })
});

const primaryValue = computed<PrimaryColorKey>({
  get: () => settings.state.value.primary ?? 'indigo',
  set: value => settings.setState({ primary: value })
});

const radiusValue = computed<ThemeRadius>({
  get: () => (settings.state.value.radius ?? 'md') as ThemeRadius,
  set: value => settings.setState({ radius: value })
});
const radiusIndex = computed(() => [themeRadiusKeys.indexOf(radiusValue.value)]);
const radiusFromIndex = computed(() => themeRadiusKeys[radiusIndex.value[0]] ?? 'md');
const radiusLabel = computed(() => `${THEME_RADIUS[radiusFromIndex.value]}`);
const setRadiusValue = (values: number[]) => {
  const index = values[0];
  radiusValue.value = themeRadiusKeys[index] ?? 'md';
};

const sizeValue = computed<ThemeSize>({
  get: () => (settings.state.value.size ?? 'md') as ThemeSize,
  set: value => settings.setState({ size: value })
});

const feedbackValue = computed<FeedbackSchemeKey>({
  get: () => settings.state.value.feedback ?? 'classic',
  set: value => settings.setState({ feedback: value })
});

const chartValue = computed<ChartSchemeKey>({
  get: () => settings.state.value.chart ?? 'vivid',
  set: value => settings.setState({ chart: value })
});

const sidebarValue = computed<SidebarSchemeKey>({
  get: () => settings.state.value.sidebar ?? 'derived',
  set: value => settings.setState({ sidebar: value })
});

const lightLevelValue = computed<LightLevelOffset>({
  get: () => settings.state.value.lightLevel ?? 0,
  set: value => settings.setState({ lightLevel: value })
});

const darkLevelValue = computed<DarkLevelOffset>({
  get: () => settings.state.value.darkLevel ?? 0,
  set: value => settings.setState({ darkLevel: value })
});

const borderOpacityValue = computed<number>({
  get: () => settings.state.value.borderOpacity ?? 1,
  set: value => settings.setState({ borderOpacity: value })
});

const menuColorValue = computed<MenuColor>({
  get: () => settings.state.value.menuColor ?? 'default',
  set: value => settings.setState({ menuColor: value })
});

const menuAccentValue = computed<MenuAccent>({
  get: () => settings.state.value.menuAccent ?? 'subtle',
  set: value => settings.setState({ menuAccent: value })
});

const sizeOptions = computed<SelectOptionData<ThemeSize>[]>(() =>
  themeSizeKeys.map(key => ({
    label: resolveOption('size', key),
    value: key
  }))
);

const menuColorOptions = computed<SelectOptionData<MenuColor>[]>(() =>
  (['default', 'inverted', 'default-translucent', 'inverted-translucent'] as MenuColor[]).map(value => ({
    label: resolveOption('menuColor', value),
    value
  }))
);
const menuAccentOptions = computed<SelectOptionData<MenuAccent>[]>(() =>
  (['subtle', 'bold'] as MenuAccent[]).map(value => ({
    label: resolveOption('menuAccent', value),
    value
  }))
);

// —— 编辑分片：level（Base 表面层级）与 custom（variant 分组）各自独立选择 light/dark ——
const levelMode = ref<'light' | 'dark'>('light');
const customMode = ref<'light' | 'dark'>('light');

const variantModeOptions = computed<SegmentOptionData<'light' | 'dark'>[]>(() => [
  { label: resolveOption('mode', 'light'), value: 'light' },
  { label: resolveOption('mode', 'dark'), value: 'dark' }
]);

/** Base 表面层级分片：语义为 Lightness / Darkness 偏移，非主题亮/暗模式。 */
const levelModeOptions = computed<SegmentOptionData<'light' | 'dark'>[]>(() => [
  { label: resolveOption('level', 'lightness'), value: 'light' },
  { label: resolveOption('level', 'darkness'), value: 'dark' }
]);

const variants = useThemeVariants({ settings, mode: customMode });

/** 写入某个 variant token 的 override（配合 `final` 值显示，反映当前派生结果） */
const setVariant = (key: ColorKey, value: string): void => {
  settings.setOverride(customMode.value, key, value as ColorValue);
};

// —— base 表面层级：lightLevel/darkLevel 由 Base 区域独立的 levelMode 分片决定 ——
// 标签与滑块范围随分片切换：light → Lightness(0-2)，dark → Darkness(0-3)。
const levelValue = computed<number>(() => (levelMode.value === 'light' ? lightLevelValue.value : darkLevelValue.value));
const levelMax = computed(() => (levelMode.value === 'light' ? 2 : 3));
const levelIndex = computed(() => [levelValue.value]);
const setLevelValue = (values: number[]) => {
  const index = values[0] as LightLevelOffset;
  if (levelMode.value === 'light') {
    lightLevelValue.value = index;
  } else {
    darkLevelValue.value = index as DarkLevelOffset;
  }
};

// —— 顶层 Tabs：Theme（常规设置） / Custom（高级自定义）——
const mainTab = ref<'theme' | 'custom'>('theme');
const mainTabs = computed<TabsOptionData[]>(() => [
  { label: resolveLabel('theme'), value: 'theme' },
  { label: resolveLabel('custom'), value: 'custom' }
]);

const sectionVisible = (section: ThemeCustomizerSection): boolean => props.sections.includes(section);

watch(settings.state, () => settings.commit());

// —— mode 偏好由 <ThemeModeSelect> 直接绑定主题上下文（theme.mode），settings.state.mode
//    仅在初始化时快照。若不随 theme.mode 同步，则任何配置改动（如切换 base）触发 commit
//    时会把过期的 settings.state.mode（light）写回 theme，导致 mode 被重置 ——
watch(
  () => theme.mode.value,
  value => {
    settings.setState({ mode: value });
  }
);
</script>

<template>
  <div class="min-w-80 max-h-[70vh] space-y-6 p-4 overflow-y-auto">
    <!-- 顶层 Tabs：Theme（常规设置） / Custom（高级自定义） -->
    <STabs v-model="mainTab" :items="mainTabs" :size="size">
      <template #content="{ value: mainValue }">
        <!-- Theme 面板：常规设置 + levels -->
        <div v-if="mainValue === 'theme'" class="space-y-4 pt-2">
          <!-- mode -->
          <SectionItem v-if="sectionVisible('mode')" :title="resolveLabel('mode')">
            <ThemeModeSelect class="w-35" />
          </SectionItem>

          <!-- palette -->
          <SectionItem v-if="sectionVisible('palette')" :title="resolveLabel('palette')" orientation="vertical">
            <SectionItem :label="resolveLabel('base')">
              <BasePaletteSelect v-model="baseValue" class="w-50" />
            </SectionItem>

            <!-- levels：base 表面层级，一行内小尺寸切换 light/dark + 层级滑块 -->
            <SectionItem v-if="sectionVisible('advanced')">
              <template #left>
                <SSegment v-model="levelMode" :items="levelModeOptions" size="sm" class="shrink-0" />
              </template>
              <div class="w-3/5 flex items-center gap-3">
                <SSlider
                  :model-value="levelIndex"
                  :min="0"
                  :max="levelMax"
                  :step="1"
                  class="w-full"
                  @update:model-value="setLevelValue"
                />
                <span class="w-6 shrink-0 text-right text-xs text-muted-foreground">{{ levelValue }}</span>
              </div>
            </SectionItem>

            <SectionItem :label="resolveLabel('primary')">
              <PrimaryPaletteSelect v-model="primaryValue" class="w-50" />
            </SectionItem>
          </SectionItem>

          <!-- scheme -->
          <SectionItem v-if="sectionVisible('scheme')" :title="resolveLabel('scheme')" orientation="vertical">
            <SectionItem :label="resolveLabel('feedback')">
              <FeedbackSchemaSelect v-model="feedbackValue" class="w-50" />
            </SectionItem>
            <SectionItem :label="resolveLabel('chart')">
              <ChartSchemaSelect v-model="chartValue" class="w-50" />
            </SectionItem>
            <SectionItem :label="resolveLabel('sidebar')">
              <SidebarSchemaSelect v-model="sidebarValue" class="w-50" />
            </SectionItem>
          </SectionItem>

          <!-- size -->
          <SectionItem v-if="sectionVisible('size')" :title="resolveLabel('size')">
            <SSelect v-model="sizeValue" :items="sizeOptions" class="w-50" />
          </SectionItem>

          <!-- radius -->
          <SectionItem v-if="sectionVisible('radius')" :title="resolveLabel('radius')">
            <div class="w-2/3 flex items-center gap-3">
              <SSlider
                :model-value="radiusIndex"
                :min="0"
                :max="themeRadiusKeys.length - 1"
                :step="1"
                class="w-full"
                @update:model-value="setRadiusValue"
              />
              <span class="w-15 shrink-0 text-right text-xs text-muted-foreground">{{ radiusLabel }}</span>
            </div>
          </SectionItem>

          <!-- border opacity -->
          <SectionItem v-if="sectionVisible('advanced')" :label="resolveLabel('borderOpacity')">
            <div class="w-2/3 flex items-center gap-3">
              <SSlider
                :model-value="[borderOpacityValue * 100]"
                :min="0"
                :max="100"
                :step="5"
                class="w-full"
                @update:model-value="value => (borderOpacityValue = value[0] / 100)"
              />
              <span class="w-10 shrink-0 text-right text-xs text-muted-foreground">
                {{ Math.round(borderOpacityValue * 100) }}%
              </span>
            </div>
          </SectionItem>

          <!-- menu settings -->
          <SectionItem v-if="sectionVisible('advanced')" :title="resolveLabel('menu')" orientation="vertical">
            <SectionItem :label="resolveLabel('menuColor')">
              <SSelect v-model="menuColorValue" :items="menuColorOptions" :size="size" class="w-40" />
            </SectionItem>
            <SectionItem :label="resolveLabel('menuAccent')">
              <SSelect v-model="menuAccentValue" :items="menuAccentOptions" :size="size" class="w-40" />
            </SectionItem>
          </SectionItem>
        </div>

        <!-- Custom 面板：各 variant 分组平铺，独立选择 light/dark 分片 -->
        <div v-else class="space-y-4 pt-2">
          <template v-if="sectionVisible('advanced')">
            <div class="flex-y-center justify-between">
              <span class="text-xs font-medium text-foreground">{{ resolveLabel('cssVars') }}</span>
              <SSegment v-model="customMode" :items="variantModeOptions" size="sm" />
            </div>

            <section v-for="group in variants.groups" :key="group.key" class="space-y-2">
              <h4 class="text-xs font-medium text-foreground">{{ resolveLabel(group.i18n) }}</h4>
              <div v-for="meta in group.tokens" :key="meta.key" class="flex-y-center justify-between gap-3">
                <span class="text-xs text-foreground">{{ resolveLabel(meta.i18n) }}</span>
                <SPalettePicker
                  :size="size"
                  :model-value="variants.final.value[meta.key]"
                  class="w-50"
                  @update:model-value="value => setVariant(meta.key, value)"
                />
              </div>
            </section>
          </template>
        </div>
      </template>
    </STabs>

    <!-- actions -->
    <section v-if="showActions" class="space-y-3 border-t pt-4">
      <SButton :size="size" color="destructive" variant="outline" class="w-full" @click="settings.reset">
        {{ resolveLabel('reset') }}
      </SButton>
    </section>
  </div>
</template>
