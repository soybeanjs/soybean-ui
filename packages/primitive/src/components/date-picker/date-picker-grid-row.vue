<script setup lang="ts">
import CalendarGridRow from '../calendar/calendar-grid-row.vue';
import type { CalendarGridRowProps } from '../calendar';

defineOptions({
  name: 'DatePickerGridRow'
});

export interface DatePickerGridRowProps extends CalendarGridRowProps {}

const props = defineProps<DatePickerGridRowProps>();
</script>

<template>
  <CalendarGridRow v-bind="props">
    <slot />
  </CalendarGridRow>
</template>
