<script setup lang="ts">
import { RangeCalendarNext } from '../range-calendar';
import type { DateRangePickerNextPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerNext'
});

const props = defineProps<DateRangePickerNextPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarNext v-slot="slotProps" v-bind="props">
    <slot v-bind="slotProps" />
  </RangeCalendarNext>
</template>
