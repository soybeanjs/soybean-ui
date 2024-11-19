<script setup lang="ts">
import CalendarGrid from '../calendar/calendar-grid.vue';
import type { CalendarGridProps } from '../calendar';

defineOptions({
  name: 'DatePickerGrid'
});

export interface DatePickerGridProps extends CalendarGridProps {}

const props = defineProps<DatePickerGridProps>();
</script>

<template>
  <CalendarGrid v-bind="props">
    <slot />
  </CalendarGrid>
</template>
