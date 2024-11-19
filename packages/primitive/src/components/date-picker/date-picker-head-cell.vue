<script setup lang="ts">
import CalendarHeadCell from '../calendar/calendar-head-cell.vue';
import type { CalendarHeadCellProps } from '../calendar';

defineOptions({
  name: 'DatePickerHeadCell'
});

export interface DatePickerHeadCellProps extends CalendarHeadCellProps {}

const props = defineProps<DatePickerHeadCellProps>();
</script>

<template>
  <CalendarHeadCell v-bind="props">
    <slot />
  </CalendarHeadCell>
</template>
