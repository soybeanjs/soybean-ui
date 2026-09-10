<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import type { ChartConfig } from './chart-config';

interface Props {
  /** 系列配置；每个 `color` 会被注入为容器上的 `--color-<key>` CSS 变量。 */
  config: ChartConfig;
}

const props = defineProps<Props>();

/**
 * 将配置中的系列颜色映射为 `--color-<key>` 自定义属性。
 * 图元以 shadcn 约定引用 `var(--color-<key>)`，颜色随主题 token 变化。
 */
const cssVars = computed<CSSProperties>(() =>
  Object.entries(props.config).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value?.color) {
      acc[`--color-${key}`] = value.color;
    }
    return acc;
  }, {})
);
</script>

<template>
  <div :style="cssVars" class="w-full">
    <slot />
  </div>
</template>
