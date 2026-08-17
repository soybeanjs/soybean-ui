<script setup lang="ts">
import { chartColors } from '@soybeanjs/chart';
import { defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';

interface LineDatum {
  month: string;
  downloads: number;
}

const chartData: LineDatum[] = [
  { month: 'Jan', downloads: 42 },
  { month: 'Feb', downloads: 58 },
  { month: 'Mar', downloads: 51 },
  { month: 'Apr', downloads: 73 },
  { month: 'May', downloads: 81 }
];

const chart = defineChart({
  marks: [
    lineY(chartData, {
      x: 'month',
      y: 'downloads',
      points: true,
      stroke: chartColors[0],
      strokeWidth: 2
    })
  ],
  x: {
    scale: () => scalePoint<string>().padding(0.2)
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
    <Chart :definition="chart" aria-label="Downloads by month" :height="250" />
  </div>
</template>
