<script setup lang="ts">
import CalendarNext from '../calendar/calendar-next.vue';
import type { CalendarNextProps } from '../calendar';

defineOptions({
  name: 'DatePickerNext'
});

export interface DatePickerNextProps extends CalendarNextProps {}

const props = defineProps<DatePickerNextProps>();
</script>

<template>
  <CalendarNext v-bind="props">
    <slot />
  </CalendarNext>
</template>
