<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarCellProps } from './types';

defineOptions({
  name: 'RangeCalendarCell'
});

const props = withDefaults(defineProps<RangeCalendarCellProps>(), {
  as: 'td'
});

const cls = useRangeCalendarUi('cell');
const { isDateSelected, isDateDisabled, isDateUnavailable } = useRangeCalendarRootContext('RangeCalendarCell');

const selected = computed(() => isDateSelected(props.date));
const disabled = computed(() => isDateDisabled(props.date) || isDateUnavailable?.(props.date));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-disabled="disabled ? true : undefined"
    :aria-selected="selected ? true : undefined"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-selected="selected ? '' : undefined"
    data-slot="cell"
    role="gridcell"
  >
    <slot />
  </Primitive>
</template>
