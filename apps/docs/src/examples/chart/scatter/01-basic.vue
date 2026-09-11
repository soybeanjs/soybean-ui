<script setup lang="ts">
import { defineChart, dot } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { chartSvgTheme, chartTooltip } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';
import ChartRenderer from '~/components/chart/chart-renderer.vue';

interface ScatterDatum {
  income: number;
  lifeExpectancy: number;
}

const chartData: ScatterDatum[] = [
  { income: 40, lifeExpectancy: 75 },
  { income: 58, lifeExpectancy: 82 },
  { income: 24, lifeExpectancy: 68 },
  { income: 36, lifeExpectancy: 71 },
  { income: 68, lifeExpectancy: 80 },
  { income: 12, lifeExpectancy: 63 },
  { income: 44, lifeExpectancy: 74 },
  { income: 52, lifeExpectancy: 78 },
  { income: 30, lifeExpectancy: 69 },
  { income: 74, lifeExpectancy: 83 }
];

const chartConfig = {
  points: {
    label: 'Countries',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

const scatterTooltip = {
  ...chartTooltip,
  anchor: 'point'
} as const;

const chart = defineChart({
  marks: [
    dot(chartData, {
      id: 'countries-dots',
      x: 'income',
      y: 'lifeExpectancy',
      r: 4,
      fill: 'var(--color-points)'
    })
  ],
  scales: {
    x: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: 'Income (USD thousands)', line: false, ticks: { size: 0, padding: 10 } }
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { label: 'Life expectancy', line: false, ticks: { size: 0, padding: 10 } }
    }
  },
  color: {
    domain: ['points'],
    range: ['var(--color-points)']
  },
  margin: { top: 8, right: 16, bottom: 40, left: 50 },
  theme: chartSvgTheme,
  focus: 'nearest',
  svgAnimation: false,
  tooltip: scatterTooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" title="Scatter Chart" description="Life expectancy vs income">
    <ChartRenderer :definition="chart" aria-label="Life expectancy by income" :height="300" />
  </ChartContainer>
</template>
