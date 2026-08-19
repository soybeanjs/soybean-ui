<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { StatisticCompact, provideStatisticUi } from '@soybeanjs/headless/statistic';
import { statisticVariants } from '@/styles/statistic';
import type { StatisticProps, StatisticSlots } from './types';

defineOptions({
  name: 'SStatistic'
});

const props = withDefaults(defineProps<StatisticProps>(), {
  value: 0,
  groupSeparator: ',',
  decimalSeparator: '.'
});

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const slots = defineSlots<StatisticSlots>();

const ui = computed(() => statisticVariants({ size: props.size, trend: props.trend }, props.ui, { root: props.class }));

provideStatisticUi(ui);
</script>

<template>
  <StatisticCompact v-bind="forwardedProps">
    <template v-for="(_, slotName) in slots" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </StatisticCompact>
</template>
