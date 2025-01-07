<script setup lang="ts">
import { RangeCalendarCellTrigger } from '../range-calendar';
import type { DateRangePickerCellTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerCellTrigger'
});

const props = defineProps<DateRangePickerCellTriggerPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarCellTrigger v-bind="props">
    <slot />
  </RangeCalendarCellTrigger>
</template>
