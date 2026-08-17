<script setup lang="ts">
import { areaY, colorLegend, defineChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '@soybeanjs/chart';

interface StackedAreaDatum {
  quarter: string;
  business: 'Core' | 'Services';
  revenue: number;
}

const chartData: StackedAreaDatum[] = [
  { quarter: 'Q1', business: 'Core', revenue: 42 },
  { quarter: 'Q1', business: 'Services', revenue: 18 },
  { quarter: 'Q2', business: 'Core', revenue: 48 },
  { quarter: 'Q2', business: 'Services', revenue: 24 },
  { quarter: 'Q3', business: 'Core', revenue: 53 },
  { quarter: 'Q3', business: 'Services', revenue: 31 },
  { quarter: 'Q4', business: 'Core', revenue: 59 },
  { quarter: 'Q4', business: 'Services', revenue: 38 }
];

const business = ['Core', 'Services'] as const;

const chart = defineChart({
  marks: [
    areaY(chartData, {
      x: 'quarter',
      y: 'revenue',
      color: 'business',
      fillOpacity: 0.7
    })
  ],
  x: {
    scale: () => scalePoint<string>().padding(0.15)
  },
  y: {
    scale: scaleLinear,
    nice: true,
    grid: true
  },
  color: {
    domain: [...business],
    range: [chartColors[0], chartColors[1]],
    legend: colorLegend({ label: 'Business' })
  },
  tooltip
});
</script>

<template>
  <div class="h-[250px]">
    <Chart :definition="chart" aria-label="Revenue by quarter and business" :height="250" />
  </div>
</template>
