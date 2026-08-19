<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber, transformPropsToContext } from '../../shared';
import { useDirection } from '../config-provider/context';
import { provideStatisticRootContext, useStatisticUi } from './context';
import type { StatisticRootProps } from './types';

defineOptions({
  name: 'StatisticRoot'
});

const props = withDefaults(defineProps<StatisticRootProps>(), {
  value: 0,
  groupSeparator: ',',
  decimalSeparator: '.'
});

const cls = useStatisticUi('root');

const dir = useDirection(() => props.dir);

const formattedValue = computed(() => {
  const value = props.value ?? 0;

  if (props.formatter) return props.formatter(value);

  return formatNumber(value, {
    precision: props.precision,
    groupSeparator: props.groupSeparator,
    decimalSeparator: props.decimalSeparator
  });
});

provideStatisticRootContext({
  ...transformPropsToContext(props, ['value', 'precision', 'groupSeparator', 'decimalSeparator', 'formatter', 'trend']),
  dir,
  formattedValue
});
</script>

<template>
  <div data-soybean-statistic-root :dir="dir" :data-trend="trend ?? undefined" :class="cls">
    <slot />
  </div>
</template>
