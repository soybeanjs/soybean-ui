<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useChartContext } from '../../context';
import { chartLegendContentVariants } from '../../styles/chart-legend-content';
import type { ChartLegendContentProps } from './types';

defineOptions({
  name: 'SChartLegendContent'
});

const props = withDefaults(defineProps<ChartLegendContentProps>(), {
  verticalAlign: 'bottom'
});

const { id, config } = useChartContext('SChartLegendContent');

const containerSelector = ref('');

const payload = computed(() =>
  Object.entries(config.value).map(([key, value]) => ({
    key: props.nameKey || key,
    itemConfig: value
  }))
);

const ui = computed(() =>
  chartLegendContentVariants({ verticalAlign: props.verticalAlign }, undefined, { root: props.class })
);

onMounted(() => {
  containerSelector.value = `[data-chart="${id}"]>[data-vis-xy-container]`;
});
</script>

<template>
  <div v-if="containerSelector" :class="ui.root">
    <div v-for="{ key, itemConfig } in payload" :key="key" :class="ui.item">
      <component :is="itemConfig.icon" v-if="itemConfig.icon && !hideIcon" />
      <div v-else :class="ui.indicator" :style="{ backgroundColor: itemConfig?.color }" />
      {{ itemConfig.label }}
    </div>
  </div>
</template>
