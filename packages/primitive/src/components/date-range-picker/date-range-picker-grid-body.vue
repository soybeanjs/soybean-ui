<script setup lang="ts">
import { RangeCalendarGridBody, type RangeCalendarGridBodyProps } from '..';

export interface DateRangePickerGridBodyProps extends RangeCalendarGridBodyProps {}

const props = defineProps<DateRangePickerGridBodyProps>();
</script>

<template>
  <RangeCalendarGridBody v-bind="props">
    <slot />
  </RangeCalendarGridBody>
</template>
