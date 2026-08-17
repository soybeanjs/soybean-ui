<script setup lang="ts">
import { colorLegend, defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '@soybeanjs/chart';

interface MultiLineDatum {
  month: string;
  series: 'Desktop' | 'Mobile';
  value: number;
}

const chartData: MultiLineDatum[] = [
  { month: 'Jan', series: 'Desktop', value: 186 },
  { month: 'Jan', series: 'Mobile', value: 80 },
  { month: 'Feb', series: 'Desktop', value: 305 },
  { month: 'Feb', series: 'Mobile', value: 200 },
  { month: 'Mar', series: 'Desktop', value: 237 },
  { month: 'Mar', series: 'Mobile', value: 120 },
  { month: 'Apr', series: 'Desktop', value: 73 },
  { month: 'Apr', series: 'Mobile', value: 190 },
  { month: 'May', series: 'Desktop', value: 209 },
  { month: 'May', series: 'Mobile', value: 130 },
  { month: 'Jun', series: 'Desktop', value: 214 },
  { month: 'Jun', series: 'Mobile', value: 140 }
];

const series = ['Desktop', 'Mobile'] as const;

const chart = defineChart({
  marks: [
    lineY(chartData, {
      x: 'month',
      y: 'value',
      z: 'series',
      color: 'series',
      points: true,
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
  color: {
    domain: [...series],
    range: [chartColors[0], chartColors[1]],
    legend: colorLegend({ label: 'Device' })
  },
  tooltip
});
</script>

<template>
  <div class="h-[250px]">
    <Chart :definition="chart" aria-label="Traffic by month and device" :height="250" />
  </div>
</template>
