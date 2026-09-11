<script setup lang="ts">
import { d3Curve, defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { curveMonotoneX } from 'd3-shape';
import { chartSvgTheme, chartTooltip, chartXAxisOptions } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';
import ChartRenderer from '~/components/chart/chart-renderer.vue';

interface MultiLineDatum {
  month: string;
  device: 'desktop' | 'mobile';
  value: number;
}

const chartData: MultiLineDatum[] = [
  { month: 'Jan', device: 'desktop', value: 186 },
  { month: 'Jan', device: 'mobile', value: 80 },
  { month: 'Feb', device: 'desktop', value: 305 },
  { month: 'Feb', device: 'mobile', value: 200 },
  { month: 'Mar', device: 'desktop', value: 237 },
  { month: 'Mar', device: 'mobile', value: 120 },
  { month: 'Apr', device: 'desktop', value: 73 },
  { month: 'Apr', device: 'mobile', value: 190 },
  { month: 'May', device: 'desktop', value: 209 },
  { month: 'May', device: 'mobile', value: 130 },
  { month: 'Jun', device: 'desktop', value: 214 },
  { month: 'Jun', device: 'mobile', value: 140 }
];

const devices = ['desktop', 'mobile'] as const;

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
  mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    lineY(chartData, {
      id: 'visitor-lines',
      x: 'month',
      y: 'value',
      z: 'device',
      color: 'device',
      curve: d3Curve(curveMonotoneX),
      strokeWidth: 2
    })
  ],
  scales: {
    x: {
      scale: () => scalePoint<string>().padding(0.2),
      axis: chartXAxisOptions
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { line: false, ticks: false, tickLabels: false }
    }
  },
  color: {
    domain: [...devices],
    range: devices.map(device => `var(--color-${device})`)
  },
  margin: { top: 8, right: 12, bottom: 35, left: 12 },
  theme: chartSvgTheme,
  focus: 'group-x',
  svgAnimation: false,
  tooltip: chartTooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" title="Line Chart - Multiple" description="January - June 2024">
    <ChartRenderer :definition="chart" aria-label="Visitors by month and device" :height="300" />

    <template #footer>
      <div class="flex items-center gap-2 font-medium">
        Trending up by 5.2% this month
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
      <div class="text-muted-foreground">Showing total visitors for the last 6 months</div>
    </template>
  </ChartContainer>
</template>
