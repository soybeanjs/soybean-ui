<script setup lang="ts">
import { RangeCalendarGridRow } from '../range-calendar';
import type { DateRangePickerGridRowPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerGridRow'
});

const props = defineProps<DateRangePickerGridRowPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarGridRow v-bind="props">
    <slot />
  </RangeCalendarGridRow>
</template>
