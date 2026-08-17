<script setup lang="ts">
import { computed, toRefs, useId } from 'vue';
import { provideChartContext } from '../../context';
import { chartContainerVariants } from '../../styles/chart-container';
import SChartStyle from '../chart-style/chart-style.vue';
import type { ChartContainerProps, ChartContainerSlots } from './types';

defineOptions({
  name: 'SChartContainer'
});

const props = withDefaults(defineProps<ChartContainerProps>(), {
  cursor: true
});

defineSlots<ChartContainerSlots>();

const { config } = toRefs(props);
const uniqueId = useId();

const chartId = computed(() => `chart-${props.id ?? uniqueId.replace(/:/g, '')}`);

const cls = computed(() => chartContainerVariants(undefined, props.class));

const containerStyle = computed(() => ({
  '--vis-tooltip-padding': '0px',
  '--vis-tooltip-background-color': 'transparent',
  '--vis-tooltip-border-color': 'transparent',
  '--vis-tooltip-text-color': 'none',
  '--vis-tooltip-shadow-color': 'none',
  '--vis-tooltip-backdrop-filter': 'none',
  '--vis-crosshair-circle-stroke-color': '#0000',
  '--vis-crosshair-line-stroke-width': props.cursor ? '1px' : '0px',
  '--vis-font-family': 'var(--font-sans)'
}));

provideChartContext({ id: chartId.value, config });
</script>

<template>
  <div data-slot="chart" :data-chart="chartId" :class="cls" :style="containerStyle">
    <slot :id="chartId" :config="config" />
    <SChartStyle :id="chartId" />
  </div>
</template>
