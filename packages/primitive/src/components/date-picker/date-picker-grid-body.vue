<script setup lang="ts">
import CalendarGridBody from '../calendar/calendar-grid-body.vue';
import type { CalendarGridBodyProps } from '../calendar';

defineOptions({
  name: 'DatePickerGridBody'
});

export interface DatePickerGridBodyProps extends CalendarGridBodyProps {}

const props = defineProps<DatePickerGridBodyProps>();
</script>

<template>
  <CalendarGridBody v-bind="props">
    <slot />
  </CalendarGridBody>
</template>
