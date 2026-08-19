<script setup lang="ts">
import { useStatisticUi } from './context';
import type { StatisticPrefixProps } from './types';

defineOptions({
  name: 'StatisticPrefix'
});

defineProps<StatisticPrefixProps>();

const cls = useStatisticUi('prefix');
</script>

<template>
  <span data-soybean-statistic-prefix :class="cls">
    <slot />
  </span>
</template>
