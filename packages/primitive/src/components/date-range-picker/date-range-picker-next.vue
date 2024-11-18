<script setup lang="ts">
import { RangeCalendarNext, type RangeCalendarNextProps } from '..';

export interface DateRangePickerNextProps extends RangeCalendarNextProps {}

const props = defineProps<DateRangePickerNextProps>();
</script>

<template>
  <RangeCalendarNext v-bind="props">
    <slot />
  </RangeCalendarNext>
</template>
