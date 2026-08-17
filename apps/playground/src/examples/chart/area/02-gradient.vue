<script setup lang="ts">
import { VisArea, VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/vue';
import { SChartContainer, SChartTooltipContent, chartColors, componentToString } from '@soybeanjs/chart';
import type { ChartConfig } from '@soybeanjs/chart';

const chartData = [
  { month: 1, monthLabel: 'January', desktop: 186, mobile: 80 },
  { month: 2, monthLabel: 'February', desktop: 305, mobile: 200 },
  { month: 3, monthLabel: 'March', desktop: 237, mobile: 120 },
  { month: 4, monthLabel: 'April', desktop: 73, mobile: 190 },
  { month: 5, monthLabel: 'May', desktop: 209, mobile: 130 },
  { month: 6, monthLabel: 'June', desktop: 214, mobile: 140 }
];

type Data = (typeof chartData)[number];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: chartColors[0]
  },
  mobile: {
    label: 'Mobile',
    color: chartColors[1]
  }
} satisfies ChartConfig;

const svgDefs = `
  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stop-color="var(--color-desktop)" stop-opacity="0.8" />
    <stop offset="95%" stop-color="var(--color-desktop)" stop-opacity="0.1" />
  </linearGradient>
  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stop-color="var(--color-mobile)" stop-opacity="0.8" />
    <stop offset="95%" stop-color="var(--color-mobile)" stop-opacity="0.1" />
  </linearGradient>
`;

const x = (d: Data) => d.month;
const areaY = [(d: Data) => d.mobile, (d: Data) => d.desktop];
const areaColor = (_d: Data, i: number) => ['url(#fillMobile)', 'url(#fillDesktop)'][i];
const lineY = [(d: Data) => d.mobile, (d: Data) => d.mobile + d.desktop];
const lineColor = (_d: Data, i: number) => [chartConfig.mobile.color, chartConfig.desktop.color][i];
const tickFormat = (d: number, index: number) => chartData[index]?.monthLabel.slice(0, 3) ?? '';
const yTickFormat = () => '';

const tooltipTemplate = componentToString(chartConfig, SChartTooltipContent, { labelKey: 'monthLabel' });
</script>

<template>
  <div class="h-[250px]">
    <SChartContainer :config="chartConfig">
      <VisXYContainer :data="chartData" :svg-defs="svgDefs">
        <VisArea :x="x" :y="areaY" :color="areaColor" :opacity="0.4" />
        <VisLine :x="x" :y="lineY" :color="lineColor" :line-width="1" />
        <VisAxis
          type="x"
          :x="x"
          :tick-line="false"
          :domain-line="false"
          :grid-line="false"
          :num-ticks="6"
          :tick-format="tickFormat"
        />
        <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" :tick-format="yTickFormat" />
        <VisTooltip />
        <VisCrosshair :template="tooltipTemplate" :color="lineColor" />
      </VisXYContainer>
    </SChartContainer>
  </div>
</template>
