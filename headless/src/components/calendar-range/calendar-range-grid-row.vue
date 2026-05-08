<script setup lang="ts">
import { Primitive } from '../primitive';
import { useCalendarRangeUi } from './context';
import type { CalendarRangeGridRowProps } from './types';

defineOptions({
  name: 'CalendarRangeGridRow'
});

withDefaults(defineProps<CalendarRangeGridRowProps>(), {
  as: 'tr'
});

const cls = useCalendarRangeUi('gridRow');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-slot="grid-row">
    <slot />
  </Primitive>
</template>
