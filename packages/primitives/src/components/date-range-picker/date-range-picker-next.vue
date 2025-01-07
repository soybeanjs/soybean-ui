<script setup lang="ts">
import { RangeCalendarNext } from '../range-calendar';
import type { DateRangePickerNextPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerNext'
});

const props = defineProps<DateRangePickerNextPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarNext v-bind="props">
    <slot />
  </RangeCalendarNext>
</template>
