<script setup lang="ts">
import { VisAxis, VisCrosshair, VisGroupedBar, VisTooltip, VisXYContainer } from '@unovis/vue';
import { SChartContainer, SChartTooltipContent, chartColors, componentToString } from '@soybeanjs/chart';
import type { ChartConfig } from '@soybeanjs/chart';

const chartData = [
  { date: new Date('2024-01-01'), desktop: 186, mobile: 80 },
  { date: new Date('2024-02-01'), desktop: 305, mobile: 200 },
  { date: new Date('2024-03-01'), desktop: 237, mobile: 120 },
  { date: new Date('2024-04-01'), desktop: 73, mobile: 190 },
  { date: new Date('2024-05-01'), desktop: 209, mobile: 130 },
  { date: new Date('2024-06-01'), desktop: 214, mobile: 140 }
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

const tickValues = chartData.map(d => d.date);
const x = (d: Data) => d.date;
const y = [(d: Data) => d.desktop, (d: Data) => d.mobile];
const colors = [chartConfig.desktop.color, chartConfig.mobile.color];
const tickFormat = (d: number) => new Date(d).toLocaleDateString('en-US', { month: 'short' });

const tooltipTemplate = componentToString(chartConfig, SChartTooltipContent, {
  indicator: 'dashed',
  hideLabel: true
});
</script>

<template>
  <div class="h-[250px]">
    <SChartContainer :config="chartConfig">
      <VisXYContainer :data="chartData">
        <VisGroupedBar
          :x="x"
          :y="y"
          :color="colors"
          :rounded-corners="4"
          bar-padding="0.15"
          group-padding="0"
        />
        <VisAxis
          type="x"
          :x="x"
          :tick-line="false"
          :domain-line="false"
          :grid-line="false"
          :num-ticks="6"
          :tick-format="tickFormat"
          :tick-values="tickValues"
        />
        <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
        <VisTooltip />
        <VisCrosshair :template="tooltipTemplate" color="#0000" />
      </VisXYContainer>
    </SChartContainer>
  </div>
</template>
