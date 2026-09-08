<script setup lang="ts">
import { SChartContainer, SChartTooltipContent, chartColors, componentToString } from '@soybeanjs/chart';
import type { ChartConfig } from '@soybeanjs/chart';
import { VisArea, VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/vue';

const chartData = [
  { month: 1, monthLabel: 'January', desktop: 186 },
  { month: 2, monthLabel: 'February', desktop: 305 },
  { month: 3, monthLabel: 'March', desktop: 237 },
  { month: 4, monthLabel: 'April', desktop: 73 },
  { month: 5, monthLabel: 'May', desktop: 209 },
  { month: 6, monthLabel: 'June', desktop: 214 }
];

type Data = (typeof chartData)[number];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: chartColors[0]
  }
} satisfies ChartConfig;

const x = (d: Data) => d.month;
const y = (d: Data) => d.desktop;
const tickFormat = (d: number, index: number) => chartData[index]?.monthLabel.slice(0, 3) ?? '';

const tooltipTemplate = componentToString(chartConfig, SChartTooltipContent, { labelKey: 'monthLabel' });
</script>

<template>
  <div class="h-[250px]">
    <SChartContainer :config="chartConfig">
      <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
        <VisArea :x="x" :y="y" :color="chartConfig.desktop.color" :opacity="0.4" />
        <VisLine :x="x" :y="y" :color="chartConfig.desktop.color" />
        <VisAxis
          type="x"
          :x="x"
          :tick-line="false"
          :domain-line="false"
          :grid-line="false"
          :num-ticks="6"
          :tick-format="tickFormat"
        />
        <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
        <VisTooltip />
        <VisCrosshair :template="tooltipTemplate" :color="chartConfig.desktop.color" />
      </VisXYContainer>
    </SChartContainer>
  </div>
</template>
