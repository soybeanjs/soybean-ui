<script lang="ts">
import type { DateValue } from '@internationalized/date';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './calendar-root.vue';

export interface CalendarNextProps extends PrimitiveProps {
  /** The function to be used for the next page. Overwrites the `nextPage` function set on the `CalendarRoot`. */
  nextPage?: (placeholder: DateValue) => DateValue;
}

const props = withDefaults(defineProps<CalendarNextProps>(), { as: 'button', step: 'month' });
const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));

const rootContext = injectCalendarRootContext();
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    aria-label="Next page"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="rootContext.nextPage(props.nextPage)"
  >
    <slot>Next page</slot>
  </Primitive>
</template>
