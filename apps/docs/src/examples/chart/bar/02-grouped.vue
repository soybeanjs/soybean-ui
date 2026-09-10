<script setup lang="ts">
import { barY, colorLegend, defineChart, group } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';

interface GroupedBarDatum {
  quarter: string;
  device: 'desktop' | 'mobile';
  revenue: number;
}

const chartData: GroupedBarDatum[] = [
  { quarter: 'Q1', device: 'desktop', revenue: 42 },
  { quarter: 'Q1', device: 'mobile', revenue: 18 },
  { quarter: 'Q2', device: 'desktop', revenue: 48 },
  { quarter: 'Q2', device: 'mobile', revenue: 24 },
  { quarter: 'Q3', device: 'desktop', revenue: 53 },
  { quarter: 'Q3', device: 'mobile', revenue: 31 },
  { quarter: 'Q4', device: 'desktop', revenue: 59 },
  { quarter: 'Q4', device: 'mobile', revenue: 38 }
];

const devices = ['desktop', 'mobile'] as const;

const chartConfig = {
  desktop: { label: 'Desktop', color: chartColors[0] },
  mobile: { label: 'Mobile', color: chartColors[1] }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    barY(chartData, {
      x: 'quarter',
      y: 'revenue',
      color: 'device',
      layout: group({ padding: 0.2 })
    })
  ],
  scales: {
    x: {
      scale: () => scaleBand<string>().padding(0.2)
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true
    }
  },
  color: {
    domain: [...devices],
    range: ['var(--color-desktop)', 'var(--color-mobile)'],
    legend: colorLegend({ label: 'Device' })
  },
  tooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" class="h-[250px]">
    <Chart :definition="chart" aria-label="Revenue by quarter and device" :height="250" />
  </ChartContainer>
</template>
