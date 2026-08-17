<script setup lang="ts">
import { defineChart, dot } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '@soybeanjs/chart';

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

const chart = defineChart({
  marks: [
    dot(chartData, {
      x: 'income',
      y: 'lifeExpectancy',
      r: 4,
      fill: chartColors[0]
    })
  ],
  x: {
    scale: scaleLinear,
    nice: true,
    grid: true,
    axis: { label: 'Income (USD thousands)' }
  },
  y: {
    scale: scaleLinear,
    nice: true,
    grid: true,
    axis: { label: 'Life expectancy' }
  },
  tooltip
});
</script>

<template>
  <div class="h-[250px]">
    <Chart :definition="chart" aria-label="Life expectancy by income" :height="250" />
  </div>
</template>
