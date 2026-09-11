<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import type { ChartConfig } from './chart-config';

interface Props {
  /** 系列配置；每个 `color` 会被注入为容器上的 `--color-<key>` CSS 变量。 */
  config: ChartConfig;
  /** 卡片标题（对齐 shadcn 示例的卡片头部）。 */
  title?: string;
  /** 标题下的描述文案。 */
  description?: string;
}

const props = defineProps<Props>();

/**
 * 将配置中的系列颜色映射为 `--color-<key>` 自定义属性。
 * 图元以 shadcn 约定引用 `var(--color-<key>)`，颜色随主题 token 变化。
 *
 * 同时注入 TanStack tooltip 的主题变量（`--ts-chart-tooltip-*`）。
 * 取值对齐 UI 库 `STooltip` popup 的实际样式（`overlaySurface` + `shadow-md`,
 * md 尺寸）：`bg-popover` / `text-popover-foreground` / `border` /
 * `rounded-md`（preset 中解析为 `calc(var(--radius) - 2px)`）/ `shadow-md`，
 * 使图表浮层与 STooltip 共用同一组主题 token，明暗主题同步跟随。
 */
const cssVars = computed<CSSProperties>(() => {
  const vars: Record<string, string> = {
    '--ts-chart-tooltip-background': 'hsl(var(--popover))',
    '--ts-chart-tooltip-color': 'hsl(var(--popover-foreground))',
    '--ts-chart-tooltip-border': '1px solid hsl(var(--border) / var(--border-alpha))',
    '--ts-chart-tooltip-border-radius': 'calc(var(--radius) - 2px)',
    '--ts-chart-tooltip-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '--ts-chart-tooltip-padding': '0.4375rem 0.625rem'
  };

  for (const [key, value] of Object.entries(props.config)) {
    if (value?.color) {
      vars[`--color-${key}`] = value.color;
    }
  }

  return vars;
});
</script>

<template>
  <div
    :style="cssVars"
    class="flex flex-col gap-6 rounded-[14px] border border-border bg-card px-6 py-6 text-card-foreground"
  >
    <header v-if="title || description" class="grid gap-2">
      <h2 v-if="title" class="text-base font-semibold leading-none tracking-[-0.01em]">{{ title }}</h2>
      <p v-if="description" class="text-sm leading-5 text-muted-foreground">{{ description }}</p>
    </header>

    <div class="flex min-h-0 min-w-0 flex-col">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="flex flex-col items-start gap-2 text-sm">
      <slot name="footer" />
    </footer>
  </div>
</template>
