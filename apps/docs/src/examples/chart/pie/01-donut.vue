<script setup lang="ts">
import { defineChart } from '@tanstack/charts';
import type { ChartPoint, ChartTooltipContent } from '@tanstack/charts';
import { focusGroupAngle, pie, polar, radialArc } from '@tanstack/charts/polar';
import { chartColors, chartSvgTheme, chartTooltip, titleCase } from '~/components/chart/chart-config';
import type { ChartConfig } from '~/components/chart/chart-config';
import ChartContainer from '~/components/chart/chart-container.vue';
import ChartRenderer from '~/components/chart/chart-renderer.vue';

interface DonutDatum {
  browser: string;
  visitors: number;
}

const chartData: DonutDatum[] = [
  { browser: 'chrome', visitors: 275 },
  { browser: 'safari', visitors: 200 },
  { browser: 'firefox', visitors: 187 },
  { browser: 'edge', visitors: 173 },
  { browser: 'other', visitors: 90 }
];

const browsers = chartData.map(datum => datum.browser);

const chartConfig = {
  chrome: { label: 'Chrome', color: chartColors[0] },
  safari: { label: 'Safari', color: chartColors[1] },
  firefox: { label: 'Firefox', color: chartColors[2] },
  edge: { label: 'Edge', color: chartColors[3] },
  other: { label: 'Other', color: chartColors[4] }
} satisfies ChartConfig;

// `pie` allocates values into angular intervals; `radialArc` renders a donut
// with a fixed inner radius, separated by 1px background-colored strokes.
const slices = pie(chartData, {
  value: 'visitors',
  startAngle: Math.PI / 2,
  endAngle: (-Math.PI * 3) / 2
});

const pieTooltip = {
  ...chartTooltip,
  content: (points: readonly ChartPoint<DonutDatum>[]): ChartTooltipContent => toPieTooltipContent(points)
} as const;

function toPieTooltipContent(points: readonly ChartPoint<DonutDatum>[]): ChartTooltipContent {
  const point = points.find(candidate => candidate.datum);

  if (!point) {
    return { rows: [] };
  }

  return {
    title: titleCase(point.datum.browser),
    rows: [
      {
        label: 'Visitors',
        value: point.datum.visitors.toLocaleString('en-US'),
        color: point.color
      }
    ]
  };
}

const chart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.78,
      marks: [
        radialArc(slices, {
          id: 'browser-slices',
          key: 'browser',
          innerRadius: 60,
          color: 'browser',
          stroke: 'hsl(var(--background))',
          strokeWidth: 1
        })
      ],
      scales: { angle: null, radius: null }
    })
  ],
  scales: { x: null, y: null },
  color: {
    domain: browsers,
    range: browsers.map(browser => `var(--color-${browser})`)
  },
  margin: 0,
  theme: chartSvgTheme,
  focus: focusGroupAngle,
  svgAnimation: false,
  tooltip: pieTooltip
});
</script>

<template>
  <ChartContainer :config="chartConfig" title="Pie Chart - Donut" description="January - June 2024">
    <div class="mx-auto w-[250px] max-w-full">
      <ChartRenderer :definition="chart" aria-label="Browser visitors donut chart" :height="250" />
    </div>

    <template #footer>
      <div class="flex items-center gap-2 font-medium">
        Trending up by 5.2% this month
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
      <div class="text-muted-foreground">Showing total visitors for the last 6 months</div>
    </template>
  </ChartContainer>
</template>
