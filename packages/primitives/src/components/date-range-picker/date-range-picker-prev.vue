<script setup lang="ts">
import { RangeCalendarPrev } from '../range-calendar';
import type { DateRangePickerPrevPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerPrev'
});

const props = defineProps<DateRangePickerPrevPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarPrev v-bind="props">
    <slot />
  </RangeCalendarPrev>
</template>
