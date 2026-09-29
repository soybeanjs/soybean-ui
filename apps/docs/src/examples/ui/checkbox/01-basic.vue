<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { resolveThemeColors } from '@soybeanjs/theme';
import { SButtonIcon, SCheckbox, SInput, SSelect, SSwitch, useTheme } from '@soybeanjs/ui';
import type { CheckedState, SelectOptionData, ThemeColor, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

type CheckboxStateKey = 'checked' | 'unchecked' | 'indeterminate';

/** 形状取值与 `checkboxVariants` 的 `shape` 变体保持一致（UI 包未单独导出该类型）。 */
type CheckboxShapeKey = 'square' | 'rounded';

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  state: CheckboxStateKey;
  color: ThemeColor;
  size: ThemeSize;
  shape: CheckboxShapeKey;
  disabled: boolean;
  label: string;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  state: 'unchecked',
  color: 'primary',
  size: 'md',
  shape: 'square',
  disabled: false,
  label: 'Checkbox'
};

/** 选项表只有「值即文案」一种形态，用一个纯函数生成，避免四份复制粘贴。 */
const toOptions = <T extends string>(values: readonly T[]): { value: T; label: T }[] =>
  values.map(value => ({ value, label: value }));

const STATE_KEYS: readonly CheckboxStateKey[] = ['checked', 'unchecked', 'indeterminate'];
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
const SHAPE_KEYS: readonly CheckboxShapeKey[] = ['square', 'rounded'];

const stateItems: SelectOptionData<CheckboxStateKey>[] = toOptions(STATE_KEYS);
const colorItems: SelectOptionData<ThemeColor>[] = toOptions(COLOR_KEYS);
const shapeItems: SelectOptionData<CheckboxShapeKey>[] = toOptions(SHAPE_KEYS);

const theme = useTheme('CheckboxCustomizer');

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

const state = shallowRef(DEFAULTS.state);
const color = shallowRef(DEFAULTS.color);
const size = shallowRef(DEFAULTS.size);
const shape = shallowRef(DEFAULTS.shape);
const disabled = shallowRef(DEFAULTS.disabled);
const label = shallowRef(DEFAULTS.label);

/** 三态选项 ↔ 组件的 `CheckedState`：双向映射，预览里勾选交互的变化也会同步回选项文案。 */
const CHECKED_STATE_MAP: Record<CheckboxStateKey, CheckedState> = {
  checked: true,
  unchecked: false,
  indeterminate: 'indeterminate'
};

const checked = computed<CheckedState>({
  get: () => CHECKED_STATE_MAP[state.value],
  set: value => {
    state.value = value === true ? 'checked' : value === false ? 'unchecked' : 'indeterminate';
  }
});

const reset = (): void => {
  state.value = DEFAULTS.state;
  color.value = DEFAULTS.color;
  size.value = DEFAULTS.size;
  shape.value = DEFAULTS.shape;
  disabled.value = DEFAULTS.disabled;
  label.value = DEFAULTS.label;
};
</script>

<template>
  <div>
    <!-- 控制区：灰底卡片上排属性表单，改动即时反映到下面的预览；容器变窄时自动降列，控件不会被压到溢出 -->
    <!-- defer 不能省：宿主区域和示例在同一棵子树里挂载，同步解析时它还没被插进文档 -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="state">
          <SSelect v-model="state" :items="stateItems" :trigger-props="{ 'aria-label': 'State' }" class="w-35" />
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
        <FieldItem label="shape">
          <SSelect v-model="shape" :items="shapeItems" :trigger-props="{ 'aria-label': 'Shape' }" class="w-30" />
        </FieldItem>
        <FieldItem label="label">
          <SInput v-model="label" aria-label="Label" placeholder="Checkbox label" />
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
      <SCheckbox v-model="checked" :color="color" :size="size" :shape="shape" :disabled="disabled" :label="label" />
    </div>
  </div>
</template>
