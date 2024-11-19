<script setup lang="ts">
import { RangeCalendarGridBody } from '../range-calendar';
import type { DateRangePickerGridBodyPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerGridBody'
});

const props = defineProps<DateRangePickerGridBodyPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarGridBody v-bind="props">
    <slot />
  </RangeCalendarGridBody>
</template>
