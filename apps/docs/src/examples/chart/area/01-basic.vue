<script setup lang="ts">
import { areaY, d3Curve, defineChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { curveNatural } from 'd3-shape';
import { chartSvgTheme, chartTooltip, chartXAxisOptions } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';
import ChartRenderer from '~/components/chart/chart-renderer.vue';

interface AreaDatum {
  month: string;
  value: number;
}

const chartData: AreaDatum[] = [
  { month: 'Jan', value: 186 },
  { month: 'Feb', value: 305 },
  { month: 'Mar', value: 237 },
  { month: 'Apr', value: 73 },
  { month: 'May', value: 209 },
  { month: 'Jun', value: 214 }
];

const chartConfig = {
  value: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    areaY(chartData, {
      id: 'revenue-areas',
      x: 'month',
      y: 'value',
      curve: d3Curve(curveNatural),
      fill: 'var(--color-value)',
      fillOpacity: 0.4,
      stroke: 'var(--color-value)',
      strokeWidth: 1.5
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
    domain: ['value'],
    range: ['var(--color-value)']
  },
  margin: { top: 8, right: 12, bottom: 35, left: 12 },
  theme: chartSvgTheme,
  focus: 'group-x',
  svgAnimation: false,
  tooltip: chartTooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" title="Area Chart" description="Showing total revenue for the last 6 months">
    <ChartRenderer :definition="chart" aria-label="Revenue by month" :height="300" />

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
      <div class="text-muted-foreground">January - June 2024</div>
    </template>
  </ChartContainer>
</template>
