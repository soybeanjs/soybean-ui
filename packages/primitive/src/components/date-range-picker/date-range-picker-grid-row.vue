<script setup lang="ts">
import { RangeCalendarGridRow, type RangeCalendarGridRowProps } from '..';

export interface DateRangePickerGridRowProps extends RangeCalendarGridRowProps {}

const props = defineProps<DateRangePickerGridRowProps>();
</script>

<template>
  <RangeCalendarGridRow v-bind="props">
    <slot />
  </RangeCalendarGridRow>
</template>
