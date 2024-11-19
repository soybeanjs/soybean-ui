<script setup lang="ts">
import { CalendarCell } from '../calendar';
import type { DatePickerCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerCell'
});

const props = defineProps<DatePickerCellPropsWithPrimitive>();
</script>

<template>
  <CalendarCell v-bind="props">
    <slot />
  </CalendarCell>
</template>
