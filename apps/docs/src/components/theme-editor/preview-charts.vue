<script setup lang="ts">
defineOptions({
  name: 'ThemeEditorPreviewCharts'
});

interface Series {
  token: string;
  class: string;
  values: number[];
}

/** the five chart tokens, in series order (chart-1 is the most used). */
const series: Series[] = [
  { token: 'chart-1', class: 'bg-chart-1', values: [64, 42, 78, 55] },
  { token: 'chart-2', class: 'bg-chart-2', values: [48, 66, 52, 72] },
  { token: 'chart-3', class: 'bg-chart-3', values: [36, 54, 40, 61] },
  { token: 'chart-4', class: 'bg-chart-4', values: [28, 38, 33, 44] },
  { token: 'chart-5', class: 'bg-chart-5', values: [18, 24, 20, 30] }
];

const groups = ['Q1', 'Q2', 'Q3', 'Q4'];

const stack = [42, 26, 18, 10, 4];
</script>

<template>
  <div class="space-y-2">
    <p class="text-xs text-muted-foreground">Grouped bars</p>
    <div class="flex h-40 items-end gap-6 rounded-lg border border-border p-3">
      <div v-for="(group, groupIndex) in groups" :key="group" class="flex h-full flex-1 flex-col justify-end gap-1">
        <div class="flex h-full items-end gap-1">
          <div
            v-for="item in series"
            :key="`${group}-${item.token}`"
            :class="item.class"
            class="flex-1 rounded-t-xs transition-all-200"
            :style="{ height: `${item.values[groupIndex]}%` }"
            :title="item.token"
          />
        </div>
        <span class="text-center text-2xs text-muted-foreground">{{ group }}</span>
      </div>
    </div>
  </div>

  <div class="space-y-2">
    <p class="text-xs text-muted-foreground">Stacked bar · legend</p>
    <div class="flex h-6 overflow-hidden rounded-sm border border-border">
      <div
        v-for="(value, index) in stack"
        :key="series[index]?.token ?? index"
        :class="series[index]?.class"
        :style="{ width: `${value}%` }"
        class="h-full"
      />
      <div class="h-full flex-1 bg-muted" />
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <span v-for="item in series" :key="item.token" class="flex items-center gap-1.5 text-2xs text-muted-foreground">
        <span :class="item.class" class="size-2.5 rounded-full" />
        {{ item.token }}
      </span>
    </div>
  </div>
</template>
