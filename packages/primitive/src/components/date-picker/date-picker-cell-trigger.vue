<script setup lang="ts">
import { CalendarCellTrigger, type CalendarCellTriggerProps } from '..';

export interface DatePickerCellTriggerProps extends CalendarCellTriggerProps {}

const props = defineProps<DatePickerCellTriggerProps>();
</script>

<template>
  <CalendarCellTrigger v-bind="props">
    <slot />
  </CalendarCellTrigger>
</template>
