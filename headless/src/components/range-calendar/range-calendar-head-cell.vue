<script setup lang="ts">
import { Primitive } from '../primitive';
import { useRangeCalendarUi } from './context';
import type { RangeCalendarHeadCellProps } from './types';

defineOptions({
  name: 'RangeCalendarHeadCell'
});

withDefaults(defineProps<RangeCalendarHeadCellProps>(), {
  as: 'th'
});

const cls = useRangeCalendarUi('headCell');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-slot="head-cell">
    <slot />
  </Primitive>
</template>
