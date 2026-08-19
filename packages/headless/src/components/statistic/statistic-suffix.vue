<script setup lang="ts">
import { useStatisticUi } from './context';
import type { StatisticSuffixProps } from './types';

defineOptions({
  name: 'StatisticSuffix'
});

defineProps<StatisticSuffixProps>();

const cls = useStatisticUi('suffix');
</script>

<template>
  <span data-soybean-statistic-suffix :class="cls">
    <slot />
  </span>
</template>
