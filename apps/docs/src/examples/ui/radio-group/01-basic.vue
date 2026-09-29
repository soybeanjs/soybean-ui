<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { resolveThemeColors } from '@soybeanjs/theme';
import { SButtonIcon, SRadioGroup, SSelect, SSwitch, useTheme } from '@soybeanjs/ui';
import type { DataOrientation, RadioGroupOptionData, SelectOptionData, ThemeColor, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/**
 * `RadioGroupVariant` 未从 `@soybeanjs/ui` 导出，这里用本地字面量联合代替
 * （与 `packages/ui/src/styles/radio-group.ts` 的 variant 定义一致）。
 */
type RadioGroupVariant = 'dot' | 'outline';

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  variant: RadioGroupVariant;
  color: ThemeColor;
  size: ThemeSize;
  orientation: DataOrientation;
  disabled: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  variant: 'dot',
  color: 'primary',
  size: 'md',
  orientation: 'horizontal',
  disabled: false
};

/** 选项表只有「值即文案」一种形态，用一个纯函数生成，避免四份复制粘贴。 */
const toOptions = <T extends string>(values: readonly T[]): { value: T; label: T }[] =>
  values.map(value => ({ value, label: value }));

const VARIANT_KEYS: readonly RadioGroupVariant[] = ['dot', 'outline'];
const COLOR_KEYS: ThemeColor[] = [
  'primary',
  'destructive',
  'success',
  'warning',
  'info',
  'carbon',
  'secondary',
  'accent'
];
const ORIENTATION_KEYS: readonly DataOrientation[] = ['horizontal', 'vertical'];

const variantItems: SelectOptionData<RadioGroupVariant>[] = toOptions(VARIANT_KEYS);
const colorItems: SelectOptionData<ThemeColor>[] = toOptions(COLOR_KEYS);
const orientationItems: SelectOptionData<DataOrientation>[] = toOptions(ORIENTATION_KEYS);

const theme = useTheme('RadioGroupCustomizer');

/** 角色 → 实际颜色：走引擎自己的解析，SSR 安全，明暗与自定义主题变化时自动刷新。 */
const colorValues = computed(() => {
  const colors = resolveThemeColors(theme.theme.value, theme.effectiveMode.value);

  const map = COLOR_KEYS.reduce(
    (acc, key) => {
      acc[key] = colors[key];
      return acc;
    },
    {} as Record<ThemeColor, string>
  );

  return map;
});

const variant = shallowRef(DEFAULTS.variant);
const color = shallowRef(DEFAULTS.color);
const size = shallowRef(DEFAULTS.size);
const orientation = shallowRef(DEFAULTS.orientation);
const disabled = shallowRef(DEFAULTS.disabled);

const value = shallowRef('option-1');

const items: RadioGroupOptionData<string>[] = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];

const reset = (): void => {
  variant.value = DEFAULTS.variant;
  color.value = DEFAULTS.color;
  size.value = DEFAULTS.size;
  orientation.value = DEFAULTS.orientation;
  disabled.value = DEFAULTS.disabled;
};
</script>

<template>
  <div>
    <!-- 控制区：灰底卡片上排属性表单，改动即时反映到下面的预览；容器变窄时自动降列，控件不会被压到溢出 -->
    <!-- defer 不能省：宿主区域和示例在同一棵子树里挂载，同步解析时它还没被插进文档 -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="variant">
          <SSelect v-model="variant" :items="variantItems" :trigger-props="{ 'aria-label': 'Variant' }" class="w-30" />
        </FieldItem>
        <FieldItem label="color">
          <SSelect v-model="color" :items="colorItems" :trigger-props="{ 'aria-label': 'Color' }" class="w-40">
            <template #trigger-leading>
              <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: colorValues[color] }"></span>
            </template>
            <template #item-leading="{ item }">
              <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: colorValues[item.value] }"></span>
            </template>
          </SSelect>
        </FieldItem>
        <FieldItem label="size">
          <SSelect v-model="size" :items="themeSizeOptions" :trigger-props="{ 'aria-label': 'Size' }" class="w-25" />
        </FieldItem>
        <FieldItem label="orientation">
          <SSelect
            v-model="orientation"
            :items="orientationItems"
            :trigger-props="{ 'aria-label': 'Orientation' }"
            class="w-33"
          />
        </FieldItem>
        <FieldItem label="disabled">
          <div class="h-8 flex items-center">
            <SSwitch v-model="disabled" :control-props="{ 'aria-label': 'Disabled' }" />
          </div>
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身 -->
    <div class="relative flex min-h-56 items-center justify-center">
      <SRadioGroup
        v-model="value"
        :items="items"
        :variant="variant"
        :color="color"
        :size="size"
        :orientation="orientation"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
