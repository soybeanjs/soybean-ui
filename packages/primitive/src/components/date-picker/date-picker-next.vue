<script setup lang="ts">
import { CalendarNext, type CalendarNextProps } from '..';

export interface DatePickerNextProps extends CalendarNextProps {}

const props = defineProps<DatePickerNextProps>();
</script>

<template>
  <CalendarNext v-bind="props">
    <slot />
  </CalendarNext>
</template>
