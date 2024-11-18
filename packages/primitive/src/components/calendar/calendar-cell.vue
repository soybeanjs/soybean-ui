<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarCell'
});

const { class: className, as = 'td', date } = defineProps<CalendarCellPropsWithPrimitive>();

const { isDateSelected, isDateDisabled, isDateUnavailable } = injectCalendarRootContext();

const ariaSelected = computed(() => (isDateSelected(date) ? true : undefined));
const ariaDisabled = computed(() => isDateDisabled(date) || isDateUnavailable?.(date));
const dataDisabled = computed(() => (isDateDisabled(date) ? '' : undefined));
</script>

<template>
  <Primitive :class="className" :as :as-child role="gridcell" :aria-selected :aria-disabled :data-disabled>
    <slot />
  </Primitive>
</template>
