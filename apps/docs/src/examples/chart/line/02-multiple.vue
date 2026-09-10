<script setup lang="ts">
import { colorLegend, defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';

interface MultiLineDatum {
  month: string;
  device: 'desktop' | 'mobile';
  value: number;
}

const chartData: MultiLineDatum[] = [
  { month: 'Jan', device: 'desktop', value: 186 },
  { month: 'Jan', device: 'mobile', value: 80 },
  { month: 'Feb', device: 'desktop', value: 305 },
  { month: 'Feb', device: 'mobile', value: 200 },
  { month: 'Mar', device: 'desktop', value: 237 },
  { month: 'Mar', device: 'mobile', value: 120 },
  { month: 'Apr', device: 'desktop', value: 73 },
  { month: 'Apr', device: 'mobile', value: 190 },
  { month: 'May', device: 'desktop', value: 209 },
  { month: 'May', device: 'mobile', value: 130 },
  { month: 'Jun', device: 'desktop', value: 214 },
  { month: 'Jun', device: 'mobile', value: 140 }
];

const devices = ['desktop', 'mobile'] as const;

const chartConfig = {
  desktop: { label: 'Desktop', color: chartColors[0] },
  mobile: { label: 'Mobile', color: chartColors[1] }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    lineY(chartData, {
      x: 'month',
      y: 'value',
      z: 'device',
      color: 'device',
      points: true,
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
    <Chart :definition="chart" aria-label="Traffic by month and device" :height="250" />
  </ChartContainer>
</template>
