<script setup lang="ts">
import { areaY, colorLegend, defineChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';

interface StackedAreaDatum {
  quarter: string;
  business: 'core' | 'services';
  revenue: number;
}

const chartData: StackedAreaDatum[] = [
  { quarter: 'Q1', business: 'core', revenue: 42 },
  { quarter: 'Q1', business: 'services', revenue: 18 },
  { quarter: 'Q2', business: 'core', revenue: 48 },
  { quarter: 'Q2', business: 'services', revenue: 24 },
  { quarter: 'Q3', business: 'core', revenue: 53 },
  { quarter: 'Q3', business: 'services', revenue: 31 },
  { quarter: 'Q4', business: 'core', revenue: 59 },
  { quarter: 'Q4', business: 'services', revenue: 38 }
];

const business = ['core', 'services'] as const;

const chartConfig = {
  core: { label: 'Core', color: chartColors[0] },
  services: { label: 'Services', color: chartColors[1] }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    areaY(chartData, {
      x: 'quarter',
      y: 'revenue',
      color: 'business',
      fillOpacity: 0.7
    })
  ],
  scales: {
    x: {
      scale: () => scalePoint<string>().padding(0.15)
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true
    }
  },
  color: {
    domain: [...business],
    range: ['var(--color-core)', 'var(--color-services)'],
    legend: colorLegend({ label: 'Business' })
  },
  tooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" class="h-[250px]">
    <Chart :definition="chart" aria-label="Revenue by quarter and business" :height="250" />
  </ChartContainer>
</template>
