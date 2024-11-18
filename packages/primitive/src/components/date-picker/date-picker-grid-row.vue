<script setup lang="ts">
import { CalendarGridRow, type CalendarGridRowProps } from '..';

export interface DatePickerGridRowProps extends CalendarGridRowProps {}

const props = defineProps<DatePickerGridRowProps>();
</script>

<template>
  <CalendarGridRow v-bind="props">
    <slot />
  </CalendarGridRow>
</template>
