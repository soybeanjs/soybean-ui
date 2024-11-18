<script setup lang="ts">
import { RangeCalendarHeader, type RangeCalendarHeaderProps } from '..';

export interface DateRangePickerHeaderProps extends RangeCalendarHeaderProps {}

const props = defineProps<DateRangePickerHeaderProps>();
</script>

<template>
  <RangeCalendarHeader v-bind="props">
    <slot />
  </RangeCalendarHeader>
</template>
