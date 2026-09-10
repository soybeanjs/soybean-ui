<script setup lang="ts">
import { colorLegend, defineChart } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart } from '@tanstack/charts/vue';
import { chartColors } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';

interface DonutDatum {
  browser: string;
  value: number;
}

const chartData: DonutDatum[] = [
  { browser: 'chrome', value: 275 },
  { browser: 'safari', value: 200 },
  { browser: 'firefox', value: 187 },
  { browser: 'edge', value: 173 },
  { browser: 'other', value: 90 }
];

const browsers = chartData.map(d => d.browser);

const chartConfig = {
  chrome: { label: 'Chrome', color: chartColors[0] },
  safari: { label: 'Safari', color: chartColors[1] },
  firefox: { label: 'Firefox', color: chartColors[2] },
  edge: { label: 'Edge', color: chartColors[3] },
  other: { label: 'Other', color: chartColors[4] }
} satisfies ChartConfig;

// `pie` allocates values into source-linked angular intervals;
// `radialArc` renders them with a responsive inner radius for a donut.
const slices = pie(chartData, { value: 'value' });

const chart = defineChart({
  marks: [
    polar({
      inset: 8,
      radiusRatio: 0.85,
      marks: [
        radialArc(slices, {
          innerRadius: ({ radius }) => radius * 0.58,
          cornerRadius: 4,
          color: 'browser',
          key: 'browser'
        })
      ],
      scales: { angle: null, radius: null }
    })
  ],
  scales: { x: null, y: null },
  color: {
    domain: browsers,
    range: browsers.map(b => `var(--color-${b})`),
    legend: colorLegend({ label: 'Browser' })
  },
  tooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" class="h-[250px]">
    <Chart :definition="chart" aria-label="Browser market share donut chart" :height="250" />
  </ChartContainer>
</template>
