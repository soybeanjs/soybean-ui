<script setup lang="ts">
import { RangeCalendarCell, type RangeCalendarCellProps } from '..';

export interface DateRangePickerCellProps extends RangeCalendarCellProps {}

const props = defineProps<DateRangePickerCellProps>();
</script>

<template>
  <RangeCalendarCell v-bind="props">
    <slot />
  </RangeCalendarCell>
</template>
