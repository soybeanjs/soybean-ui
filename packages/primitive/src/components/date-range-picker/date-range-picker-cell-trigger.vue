<script setup lang="ts">
import { RangeCalendarCellTrigger, type RangeCalendarCellTriggerProps } from '..';

export interface DateRangePickerCellTriggerProps extends RangeCalendarCellTriggerProps {}

const props = defineProps<DateRangePickerCellTriggerProps>();
</script>

<template>
  <RangeCalendarCellTrigger v-bind="props">
    <slot />
  </RangeCalendarCellTrigger>
</template>
