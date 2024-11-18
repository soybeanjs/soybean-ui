<script setup lang="ts">
import { CalendarGridBody, type CalendarGridBodyProps } from '..';

export interface DatePickerGridBodyProps extends CalendarGridBodyProps {}

const props = defineProps<DatePickerGridBodyProps>();
</script>

<template>
  <CalendarGridBody v-bind="props">
    <slot />
  </CalendarGridBody>
</template>
