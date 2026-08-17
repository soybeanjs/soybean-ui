<script setup lang="ts">
import { Donut } from '@unovis/ts';
import { VisDonut, VisSingleContainer, VisTooltip } from '@unovis/vue';
import { SChartContainer, SChartTooltipContent, chartColors, componentToString } from '@soybeanjs/chart';
import type { ChartConfig } from '@soybeanjs/chart';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' }
];

type Data = (typeof chartData)[number];

const chartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: chartColors[0] },
  safari: { label: 'Safari', color: chartColors[1] },
  firefox: { label: 'Firefox', color: chartColors[2] },
  edge: { label: 'Edge', color: chartColors[3] },
  other: { label: 'Other', color: chartColors[4] }
} satisfies ChartConfig;

const value = (d: Data) => d.visitors;
const color = (d: Data) => d.fill;

const tooltipTemplate = componentToString(chartConfig, SChartTooltipContent, { hideLabel: true });
</script>

<template>
  <div class="mx-auto h-[250px] w-[250px]">
    <SChartContainer :config="chartConfig">
      <VisSingleContainer :data="chartData" :margin="{ top: 30, bottom: 30 }">
        <VisDonut
          :value="value"
          :color="color"
          :arc-width="0"
        />
        <VisTooltip
          :triggers="{
            [Donut.selectors.segment]: tooltipTemplate!
          }"
        />
      </VisSingleContainer>
    </SChartContainer>
  </div>
</template>
