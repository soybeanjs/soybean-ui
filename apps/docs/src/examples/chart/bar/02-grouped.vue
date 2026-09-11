<script setup lang="ts">
import { barY, defineChart, group } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { chartSvgTheme, chartTooltip, chartXAxisOptions } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';
import ChartRenderer from '~/components/chart/chart-renderer.vue';

interface GroupedBarDatum {
  quarter: string;
  device: 'desktop' | 'mobile';
  revenue: number;
}

const chartData: GroupedBarDatum[] = [
  { quarter: 'Q1', device: 'desktop', revenue: 42 },
  { quarter: 'Q1', device: 'mobile', revenue: 18 },
  { quarter: 'Q2', device: 'desktop', revenue: 48 },
  { quarter: 'Q2', device: 'mobile', revenue: 24 },
  { quarter: 'Q3', device: 'desktop', revenue: 53 },
  { quarter: 'Q3', device: 'mobile', revenue: 31 },
  { quarter: 'Q4', device: 'desktop', revenue: 59 },
  { quarter: 'Q4', device: 'mobile', revenue: 38 }
];

const devices = ['desktop', 'mobile'] as const;

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
  mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    barY(chartData, {
      id: 'revenue-bars',
      x: 'quarter',
      y: 'revenue',
      color: 'device',
      radius: 8,
      layout: group({ padding: 0.2 })
    })
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().padding(0.2),
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
    domain: [...devices],
    range: devices.map(device => `var(--color-${device})`)
  },
  margin: { top: 5, right: 5, bottom: 35, left: 5 },
  theme: chartSvgTheme,
  focus: 'group-x',
  svgAnimation: false,
  tooltip: chartTooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" title="Bar Chart - Multiple" description="Revenue by quarter and device">
    <ChartRenderer :definition="chart" aria-label="Revenue by quarter and device" :height="300" />

    <template #footer>
      <div class="flex items-center gap-2 font-medium">
        Mobile keeps closing the gap
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
      <div class="text-muted-foreground">Q1 - Q4 2024</div>
    </template>
  </ChartContainer>
</template>
