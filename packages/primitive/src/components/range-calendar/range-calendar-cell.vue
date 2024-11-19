<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectRangeCalendarRootContext } from './context';
import type { RangeCalendarCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'RangeCalendarCell'
});

withDefaults(defineProps<RangeCalendarCellPropsWithPrimitive>(), {
  as: 'td'
});

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
