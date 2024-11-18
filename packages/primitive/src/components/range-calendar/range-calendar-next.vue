<script setup lang="ts">
import type { DateValue } from '@internationalized/date';

import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { injectRangeCalendarRootContext } from './range-calendar-root.vue';

export interface RangeCalendarNextProps extends PrimitiveProps {
  /** The function to be used for the next page. Overwrites the `nextPage` function set on the `RangeCalendarRoot`. */
  nextPage?: (placeholder: DateValue) => DateValue;
}

const props = withDefaults(defineProps<RangeCalendarNextProps>(), { as: 'button' });
const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));

const rootContext = injectRangeCalendarRootContext();
</script>

<template>
  <Primitive
    v-bind="props"
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
