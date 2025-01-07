<script setup lang="ts">
import { RangeCalendarCell } from '../range-calendar';
import type { DateRangePickerCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerCell'
});

const props = defineProps<DateRangePickerCellPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarCell v-bind="props">
    <slot />
  </RangeCalendarCell>
</template>
