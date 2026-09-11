<script setup lang="ts">
import { d3Curve, defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { curveNatural } from 'd3-shape';
import { chartSvgTheme, chartTooltip, chartXAxisOptions } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';
import ChartRenderer from '~/components/chart/chart-renderer.vue';

interface LineDatum {
  month: string;
  desktop: number;
}

const chartData: LineDatum[] = [
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
    lineY(chartData, {
      id: 'visitor-line',
      x: 'month',
      y: 'desktop',
      curve: d3Curve(curveNatural),
      stroke: 'var(--color-desktop)',
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
    domain: ['desktop'],
    range: ['var(--color-desktop)']
  },
  margin: { top: 8, right: 12, bottom: 35, left: 12 },
  theme: chartSvgTheme,
  focus: 'group-x',
  svgAnimation: false,
  tooltip: chartTooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" title="Line Chart" description="January - June 2024">
    <ChartRenderer :definition="chart" aria-label="Desktop visitors by month" :height="300" />

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
