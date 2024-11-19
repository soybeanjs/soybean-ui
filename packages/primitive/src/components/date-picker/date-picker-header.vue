<script setup lang="ts">
import CalendarHeader from '../calendar/calendar-header.vue';
import type { CalendarHeaderProps } from '../calendar';

defineOptions({
  name: 'DatePickerHeader'
});

export interface DatePickerHeaderProps extends CalendarHeaderProps {}

const props = defineProps<DatePickerHeaderProps>();
</script>

<template>
  <CalendarHeader v-bind="props">
    <slot />
  </CalendarHeader>
</template>
