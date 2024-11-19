<script setup lang="ts">
import CalendarPrev from '../calendar/calendar-prev.vue';
import type { CalendarPrevProps } from '../calendar';

defineOptions({
  name: 'DatePickerPrev'
});

export interface DatePickerPrevProps extends CalendarPrevProps {}

const props = defineProps<DatePickerPrevProps>();
</script>

<template>
  <CalendarPrev v-bind="props">
    <slot />
  </CalendarPrev>
</template>
