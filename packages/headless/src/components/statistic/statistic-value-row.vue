<script setup lang="ts">
import { useStatisticUi } from './context';
import type { StatisticValueRowProps } from './types';

defineOptions({
  name: 'StatisticValueRow'
});

defineProps<StatisticValueRowProps>();

const cls = useStatisticUi('valueRow');
</script>

<template>
  <div data-soybean-statistic-value-row :class="cls">
    <slot />
  </div>
</template>
