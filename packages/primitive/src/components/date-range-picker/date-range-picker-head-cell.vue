<script setup lang="ts">
import { RangeCalendarHeadCell } from '../range-calendar';
import type { DateRangePickerHeadCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerHeadCell'
});

const props = defineProps<DateRangePickerHeadCellPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarHeadCell v-bind="props">
    <slot />
  </RangeCalendarHeadCell>
</template>
