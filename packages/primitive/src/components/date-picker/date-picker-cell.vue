<script setup lang="ts">
import CalendarCell from '../calendar/calendar-cell.vue';
import type { CalendarCellProps } from '../calendar';

defineOptions({
  name: 'DatePickerCell'
});

export interface DatePickerCellProps extends CalendarCellProps {}

const props = defineProps<DatePickerCellProps>();
</script>

<template>
  <CalendarCell v-bind="props">
    <slot />
  </CalendarCell>
</template>
