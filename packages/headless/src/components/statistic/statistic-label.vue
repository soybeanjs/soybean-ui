<script setup lang="ts">
import { useStatisticUi } from './context';
import type { StatisticLabelProps } from './types';

defineOptions({
  name: 'StatisticLabel'
});

defineProps<StatisticLabelProps>();

const cls = useStatisticUi('label');
</script>

<template>
  <div data-soybean-statistic-label :class="cls">
    <slot />
  </div>
</template>
