<script setup lang="ts">
import { computed } from 'vue';

import { Primitive } from '../primitive';

import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarCellProps } from './types';

defineOptions({
  name: 'RangeCalendarCell'
});

const props = withDefaults(defineProps<RangeCalendarCellProps>(), {
  as: 'td'
});

const cls = useRangeCalendarUi('cell');
const rootContext = useRangeCalendarRootContext('RangeCalendarCell');

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
