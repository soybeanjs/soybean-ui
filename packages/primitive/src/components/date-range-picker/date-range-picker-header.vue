<script setup lang="ts">
import { RangeCalendarHeader } from '../range-calendar';
import type { DateRangePickerHeaderPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerHeader'
});

const props = defineProps<DateRangePickerHeaderPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarHeader v-bind="props">
    <slot />
  </RangeCalendarHeader>
</template>
