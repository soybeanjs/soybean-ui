<script setup lang="ts">
import { CalendarHeadCell } from '../calendar';
import type { DatePickerHeadCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerHeadCell'
});

const props = defineProps<DatePickerHeadCellPropsWithPrimitive>();
</script>

<template>
  <CalendarHeadCell v-bind="props">
    <slot />
  </CalendarHeadCell>
</template>
