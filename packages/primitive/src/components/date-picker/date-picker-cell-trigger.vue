<script setup lang="ts">
import CalendarCellTrigger from '../calendar/calendar-cell-trigger.vue';
import type { CalendarCellTriggerProps } from '../calendar';

defineOptions({
  name: 'DatePickerCellTrigger'
});

export interface DatePickerCellTriggerProps extends CalendarCellTriggerProps {}

const props = defineProps<DatePickerCellTriggerProps>();
</script>

<template>
  <CalendarCellTrigger v-bind="props">
    <slot />
  </CalendarCellTrigger>
</template>
