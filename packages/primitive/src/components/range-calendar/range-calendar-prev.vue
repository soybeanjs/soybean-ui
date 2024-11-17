<script lang="ts">
import type { DateValue } from '@internationalized/date';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { injectRangeCalendarRootContext } from './range-calendar-root.vue';

export interface RangeCalendarPrevProps extends PrimitiveProps {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the `RangeCalendarRoot`. */
  prevPage?: (placeholder: DateValue) => DateValue;
}

const props = withDefaults(defineProps<RangeCalendarPrevProps>(), { as: 'button' });
const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));

const rootContext = injectRangeCalendarRootContext();
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="Previous page"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="rootContext.prevPage(props.prevPage)"
  >
    <slot>Prev page</slot>
  </Primitive>
</template>
