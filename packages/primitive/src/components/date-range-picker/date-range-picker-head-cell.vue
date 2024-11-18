<script setup lang="ts">
import { RangeCalendarHeadCell, type RangeCalendarHeadCellProps } from '..';

export interface DateRangePickerHeadCellProps extends RangeCalendarHeadCellProps {}

const props = defineProps<DateRangePickerHeadCellProps>();
</script>

<template>
  <RangeCalendarHeadCell v-bind="props">
    <slot />
  </RangeCalendarHeadCell>
</template>
