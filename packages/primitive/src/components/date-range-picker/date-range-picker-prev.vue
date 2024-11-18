<script setup lang="ts">
import { RangeCalendarPrev, type RangeCalendarPrevProps } from '..';

export interface DateRangePickerPrevProps extends RangeCalendarPrevProps {}

const props = defineProps<DateRangePickerPrevProps>();
</script>

<template>
  <RangeCalendarPrev v-bind="props">
    <slot />
  </RangeCalendarPrev>
</template>
