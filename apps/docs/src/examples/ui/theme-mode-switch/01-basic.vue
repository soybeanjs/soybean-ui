<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { resolveThemeColors } from '@soybeanjs/theme';
import { SButtonIcon, SSelect, SSwitch, SThemeModeSwitch, useTheme } from '@soybeanjs/ui';
import type { SelectOptionData, ThemeColor, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';

interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 自定义器状态：只保存「怎么渲染」，预览完全由它派生，不存在第二份镜像状态。 */
interface CustomizerState {
  size: ThemeSize;
  color: ThemeColor;
  showIcon: boolean;
}

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS: CustomizerState = {
  size: 'md',
  color: 'accent',
  showIcon: true
};

/** 选项表只有「值即文案」一种形态，用一个纯函数生成，避免四份复制粘贴。 */
const toOptions = <T extends string>(values: readonly T[]): { value: T; label: T }[] =>
  values.map(value => ({ value, label: value }));

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

const colorItems: SelectOptionData<ThemeColor>[] = toOptions(COLOR_KEYS);

const theme = useTheme('ThemeModeSwitchCustomizer');

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

const size = shallowRef(DEFAULTS.size);
const color = shallowRef(DEFAULTS.color);
const showIcon = shallowRef(DEFAULTS.showIcon);

const reset = (): void => {
  size.value = DEFAULTS.size;
  color.value = DEFAULTS.color;
  showIcon.value = DEFAULTS.showIcon;
};
</script>

<template>
  <div>
    <!-- 控制区：灰底卡片上排属性表单，改动即时反映到下面的预览；容器变窄时自动降列，控件不会被压到溢出 -->
    <!-- defer 不能省：宿主区域和示例在同一棵子树里挂载，同步解析时它还没被插进文档 -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="size">
          <SSelect v-model="size" :items="themeSizeOptions" :trigger-props="{ 'aria-label': 'Size' }" class="w-25" />
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
        <FieldItem label="showIcon">
          <div class="h-8 flex items-center">
            <SSwitch v-model="showIcon" :control-props="{ 'aria-label': 'Show icon' }" />
          </div>
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>

    <!-- 预览区：白底主体只放组件本身 -->
    <div class="relative flex min-h-56 items-center justify-center gap-4">
      <SThemeModeSwitch :size="size" :color="color" :show-icon="showIcon" />
      <span class="text-sm text-muted-foreground">Light / Dark</span>
    </div>
  </div>
</template>
