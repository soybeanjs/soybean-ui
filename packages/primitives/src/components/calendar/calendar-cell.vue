<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarCell'
});

const props = withDefaults(defineProps<CalendarCellPropsWithPrimitive>(), {
  as: 'td'
});

const { isDateSelected, isDateDisabled, isDateUnavailable, disableDaysOutsideCurrentView } =
  injectCalendarRootContext();

const ariaSelected = computed(() => (isDateSelected(props.date) ? true : undefined));
const ariaDisabled = computed(
  () => isDateDisabled(props.date) || isDateUnavailable?.(props.date) || disableDaysOutsideCurrentView.value
);
const dataDisabled = computed(() =>
  isDateDisabled(props.date) || disableDaysOutsideCurrentView.value ? '' : undefined
);
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :aria-disabled="ariaDisabled"
    :aria-selected="ariaSelected"
    :data-disabled="dataDisabled"
    role="gridcell"
  >
    <slot />
  </Primitive>
</template>
