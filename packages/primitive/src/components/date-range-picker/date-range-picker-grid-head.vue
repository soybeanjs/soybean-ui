<script setup lang="ts">
import { RangeCalendarGridHead, type RangeCalendarGridHeadProps } from '..';

export interface DateRangePickerGridHeadProps extends RangeCalendarGridHeadProps {}

const props = defineProps<DateRangePickerGridHeadProps>();
</script>

<template>
  <RangeCalendarGridHead v-bind="props">
    <slot />
  </RangeCalendarGridHead>
</template>
