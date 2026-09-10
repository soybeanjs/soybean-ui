<script setup lang="ts">
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';

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
    color: chartColors[0]
  }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    barY(chartData, {
      x: 'month',
      y: 'desktop',
      fill: 'var(--color-desktop)',
      inset: 2
    })
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().padding(0.16)
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true
    }
  },
  tooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" class="h-[250px]">
    <Chart :definition="chart" aria-label="Desktop signups by month" :height="250" />
  </ChartContainer>
</template>
