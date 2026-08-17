<script setup lang="ts">
import { chartColors } from '@soybeanjs/chart';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';

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

const chart = defineChart({
  marks: [
    barY(chartData, {
      x: 'month',
      y: 'desktop',
      fill: chartColors[0],
      inset: 2
    })
  ],
  x: {
    scale: () => scaleBand<string>().padding(0.16)
  },
  y: {
    scale: scaleLinear,
    nice: true,
    grid: true
  },
  tooltip
});
</script>

<template>
  <div class="h-[250px]">
    <Chart :definition="chart" aria-label="Desktop signups by month" :height="250" />
  </div>
</template>
