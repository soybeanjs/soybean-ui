<script setup lang="ts">
import { Primitive } from '../primitive';
import { useRangeCalendarUi } from './context';
import type { RangeCalendarGridRowProps } from './types';

defineOptions({
  name: 'RangeCalendarGridRow'
});

withDefaults(defineProps<RangeCalendarGridRowProps>(), {
  as: 'tr'
});

const cls = useRangeCalendarUi('gridRow');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-slot="grid-row">
    <slot />
  </Primitive>
</template>
