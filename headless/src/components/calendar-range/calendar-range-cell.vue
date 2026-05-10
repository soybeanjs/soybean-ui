<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useCalendarRangeRootContext, useCalendarRangeUi } from './context';
import type { CalendarRangeCellProps } from './types';

defineOptions({
  name: 'CalendarRangeCell'
});

const props = withDefaults(defineProps<CalendarRangeCellProps>(), {
  as: 'td'
});

const cls = useCalendarRangeUi('cell');
const { isDateSelected, isDateDisabled, isDateUnavailable } = useCalendarRangeRootContext('CalendarRangeCell');

const selected = computed(() => isDateSelected(props.date));
const disabled = computed(() => isDateDisabled(props.date) || isDateUnavailable?.(props.date));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    data-soybean-calendar-range-cell
    :class="cls"
    :aria-disabled="disabled ? true : undefined"
    :aria-selected="selected ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-selected="selected ? '' : undefined"
    role="gridcell"
  >
    <slot />
  </Primitive>
</template>
