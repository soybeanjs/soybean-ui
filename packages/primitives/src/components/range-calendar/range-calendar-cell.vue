<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectRangeCalendarRootContext } from './context';
import type { RangeCalendarCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'RangeCalendarCell'
});

const props = withDefaults(defineProps<RangeCalendarCellPropsWithPrimitive>(), {
  as: 'td'
});

const rootContext = injectRangeCalendarRootContext();
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isSelected(date) ? true : undefined"
    :aria-disabled="
      rootContext.isDateDisabled(date) ||
      rootContext.isDateUnavailable?.(date) ||
      rootContext.disableDaysOutsideCurrentView.value
    "
    :data-disabled="
      rootContext.isDateDisabled(date) || rootContext.disableDaysOutsideCurrentView.value ? '' : undefined
    "
  >
    <slot />
  </Primitive>
</template>
