<script setup lang="ts">
import { chartColors } from '@soybeanjs/chart';
import { barY, colorLegend, defineChart, group } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';

interface GroupedBarDatum {
  quarter: string;
  region: 'Desktop' | 'Mobile';
  revenue: number;
}

const chartData: GroupedBarDatum[] = [
  { quarter: 'Q1', region: 'Desktop', revenue: 42 },
  { quarter: 'Q1', region: 'Mobile', revenue: 18 },
  { quarter: 'Q2', region: 'Desktop', revenue: 48 },
  { quarter: 'Q2', region: 'Mobile', revenue: 24 },
  { quarter: 'Q3', region: 'Desktop', revenue: 53 },
  { quarter: 'Q3', region: 'Mobile', revenue: 31 },
  { quarter: 'Q4', region: 'Desktop', revenue: 59 },
  { quarter: 'Q4', region: 'Mobile', revenue: 38 }
];

const regions = ['Desktop', 'Mobile'] as const;

const chart = defineChart({
  marks: [
    barY(chartData, {
      x: 'quarter',
      y: 'revenue',
      color: 'region',
      layout: group({ padding: 0.2 })
    })
  ],
  x: {
    scale: () => scaleBand<string>().padding(0.2)
  },
  y: {
    scale: scaleLinear,
    nice: true,
    grid: true
  },
  color: {
    domain: [...regions],
    range: [chartColors[0], chartColors[1]],
    legend: colorLegend({ label: 'Device' })
  },
  tooltip
});
</script>

<template>
  <div class="h-[250px]">
    <Chart :definition="chart" aria-label="Revenue by quarter and device" :height="250" />
  </div>
</template>
