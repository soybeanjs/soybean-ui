<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybeanjs/headless';
import { buildChartColorCss } from '../../utils/chart-style';
import { useChartContext } from '../../context';
import type { ChartStyleProps } from './types';

defineOptions({
  name: 'SChartStyle'
});

const props = defineProps<ChartStyleProps>();

const { config } = useChartContext('SChartStyle');

const cssText = computed(() => buildChartColorCss(props.id ?? '', config.value));
</script>

<template>
  <Primitive v-if="cssText" as="style">{{ cssText }}</Primitive>
</template>
