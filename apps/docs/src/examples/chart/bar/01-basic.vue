<script setup lang="ts">
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { chartSvgTheme, chartTooltip, chartXAxisOptions } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';
import ChartRenderer from '~/components/chart/chart-renderer.vue';

interface BarDatum {
  month: string;
  desktop: number;
}

const chartData: BarDatum[] = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 }
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    barY(chartData, {
      id: 'desktop-bars',
      x: 'month',
      y: 'desktop',
      fill: 'var(--color-desktop)',
      radius: 8
    })
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().padding(0.16),
      axis: chartXAxisOptions
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: false
    }
  },
  color: {
    domain: ['desktop'],
    range: ['var(--color-desktop)']
  },
  margin: { top: 5, right: 5, bottom: 35, left: 5 },
  theme: chartSvgTheme,
  focus: 'group-x',
  svgAnimation: false,
  tooltip: chartTooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" title="Bar Chart" description="Desktop signups for the last 6 months">
    <ChartRenderer :definition="chart" aria-label="Desktop signups by month" :height="300" />

    <template #footer>
      <div class="flex items-center gap-2 font-medium">
        Trending up this month
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
          aria-hidden="true"
        >
          <path d="m3 17 6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      </div>
      <div class="text-muted-foreground">January - June 2024</div>
    </template>
  </ChartContainer>
</template>
