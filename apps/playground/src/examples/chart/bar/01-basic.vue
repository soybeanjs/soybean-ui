<script setup lang="ts">
import { SChartContainer, SChartTooltipContent, chartColors, componentToString } from '@soybeanjs/chart';
import type { ChartConfig } from '@soybeanjs/chart';
import { VisAxis, VisCrosshair, VisGroupedBar, VisTooltip, VisXYContainer } from '@unovis/vue';

const chartData = [
  { date: new Date('2024-01-01'), desktop: 186 },
  { date: new Date('2024-02-01'), desktop: 305 },
  { date: new Date('2024-03-01'), desktop: 237 },
  { date: new Date('2024-04-01'), desktop: 73 },
  { date: new Date('2024-05-01'), desktop: 209 },
  { date: new Date('2024-06-01'), desktop: 214 }
];

type Data = (typeof chartData)[number];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: chartColors[0]
  }
} satisfies ChartConfig;

const tickValues = chartData.map(d => d.date);
const x = (d: Data) => d.date;
const y = (d: Data) => d.desktop;
const tickFormat = (d: number) => new Date(d).toLocaleDateString('en-US', { month: 'short' });

const tooltipTemplate = componentToString(chartConfig, SChartTooltipContent, { hideLabel: true });
</script>

<template>
  <div class="h-[250px]">
    <SChartContainer :config="chartConfig">
      <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
        <VisGroupedBar :x="x" :y="y" :color="chartConfig.desktop.color" :rounded-corners="10" />
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
