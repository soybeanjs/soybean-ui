<script setup lang="ts">
import CalendarGridHead from '../calendar/calendar-grid-head.vue';
import type { CalendarGridHeadProps } from '../calendar';

defineOptions({
  name: 'DatePickerGridHead'
});

export interface DatePickerGridHeadProps extends CalendarGridHeadProps {}

const props = defineProps<DatePickerGridHeadProps>();
</script>

<template>
  <CalendarGridHead v-bind="props">
    <slot />
  </CalendarGridHead>
</template>
