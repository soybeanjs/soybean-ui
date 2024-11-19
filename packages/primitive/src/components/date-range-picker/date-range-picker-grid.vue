<script setup lang="ts">
import { RangeCalendarGrid } from '../range-calendar';
import type { DateRangePickerGridPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerGrid'
});

const props = defineProps<DateRangePickerGridPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarGrid v-bind="props">
    <slot />
  </RangeCalendarGrid>
</template>
