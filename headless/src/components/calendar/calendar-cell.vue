<script setup lang="ts">
import { computed } from 'vue';

import { Primitive } from '../primitive';

import { useCalendarRootContext, useCalendarUi } from './context';
import type { CalendarCellProps } from './types';

defineOptions({
  name: 'CalendarCell'
});

const props = withDefaults(defineProps<CalendarCellProps>(), {
  as: 'td'
});

const cls = useCalendarUi('cell');
const rootContext = useCalendarRootContext('CalendarCell');

const selected = computed(() => rootContext.isDateSelected(props.date));
const disabled = computed(() => rootContext.isDateDisabled(props.date) || rootContext.isDateUnavailable?.(props.date));
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
