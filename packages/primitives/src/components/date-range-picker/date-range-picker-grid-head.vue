<script setup lang="ts">
import { RangeCalendarGridHead } from '../range-calendar';
import type { DateRangePickerGridHeadPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerGridHead'
});

const props = defineProps<DateRangePickerGridHeadPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarGridHead v-bind="props">
    <slot />
  </RangeCalendarGridHead>
</template>
