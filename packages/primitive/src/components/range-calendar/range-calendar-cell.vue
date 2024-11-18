<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';
import { injectRangeCalendarRootContext } from './range-calendar-root.vue';

export interface RangeCalendarCellProps extends PrimitiveProps {
  date: DateValue;
}

withDefaults(defineProps<RangeCalendarCellProps>(), { as: 'td' });
const rootContext = injectRangeCalendarRootContext();
</script>

<template>
  <Primitive
    :as
    :as-child
    role="gridcell"
    :aria-selected="rootContext.isSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)"
    :data-disabled="rootContext.isDateDisabled(date) ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
