<script setup lang="ts">
import { areaY, defineChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';

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
    color: chartColors[0]
  }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    areaY(chartData, {
      x: 'month',
      y: 'value',
      fill: 'var(--color-value)',
      fillOpacity: 0.35,
      stroke: 'var(--color-value)',
      strokeWidth: 2
    })
  ],
  scales: {
    x: {
      scale: () => scalePoint<string>().padding(0.2)
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
    <Chart :definition="chart" aria-label="Revenue by month" :height="250" />
  </ChartContainer>
</template>
