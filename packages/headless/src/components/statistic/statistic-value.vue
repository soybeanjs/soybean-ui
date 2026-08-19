<script setup lang="ts">
import { computed } from 'vue';
import { useStatisticRootContext, useStatisticUi } from './context';
import type { StatisticValueProps } from './types';

defineOptions({
  name: 'StatisticValue'
});

defineProps<StatisticValueProps>();

const cls = useStatisticUi('value');

const context = useStatisticRootContext('StatisticValue');

const formattedValue = computed(() => context.formattedValue.value);
</script>

<template>
  <span data-soybean-statistic-value :class="cls">
    <slot>{{ formattedValue }}</slot>
  </span>
</template>
