<script setup lang="ts">
import { areaY, d3Curve, defineChart, stack } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { curveNatural } from 'd3-shape';
import { chartSvgTheme, chartTooltip, chartXAxisOptions } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';
import ChartRenderer from '~/components/chart/chart-renderer.vue';

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

const businesses = ['core', 'services'] as const;

const chartConfig = {
  core: { label: 'Core', color: 'hsl(var(--chart-1))' },
  services: { label: 'Services', color: 'hsl(var(--chart-2))' }
} satisfies ChartConfig;

const chart = defineChart({
  marks: [
    areaY(chartData, {
      id: 'revenue-areas',
      x: 'quarter',
      y: 'revenue',
      z: 'business',
      color: 'business',
      key: row => `${row.quarter}:${row.business}`,
      layout: stack({ order: [...businesses] }),
      curve: d3Curve(curveNatural),
      fillOpacity: 0.4,
      stroke: row => `var(--color-${row.business})`,
      strokeWidth: 1.5
    })
  ],
  scales: {
    x: {
      scale: () => scalePoint<string>().padding(0.15),
      axis: chartXAxisOptions
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: { line: false, ticks: false, tickLabels: false }
    }
  },
  color: {
    domain: [...businesses],
    range: businesses.map(business => `var(--color-${business})`)
  },
  margin: { top: 8, right: 12, bottom: 35, left: 12 },
  theme: chartSvgTheme,
  focus: 'group-x',
  svgAnimation: false,
  tooltip: chartTooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" title="Stacked Area Chart" description="Revenue split by business line">
    <ChartRenderer :definition="chart" aria-label="Revenue by quarter and business" :height="300" />

    <template #footer>
      <div class="flex items-center gap-2 font-medium">
        Core revenue keeps leading
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
          aria-hidden="true"
        >
          <path d="m3 17 6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      </div>
      <div class="text-muted-foreground">Q1 - Q4 2024</div>
    </template>
  </ChartContainer>
</template>
