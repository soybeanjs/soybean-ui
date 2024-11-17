<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './calendar-root.vue';

export interface CalendarCellProps extends PrimitiveProps {
  /** The date value for the cell */
  date: DateValue;
}

withDefaults(defineProps<CalendarCellProps>(), { as: 'td' });
const rootContext = injectCalendarRootContext();
</script>

<template>
  <Primitive
    :as
    :as-child
    role="gridcell"
    :aria-selected="rootContext.isDateSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)"
    :data-disabled="rootContext.isDateDisabled(date) ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
