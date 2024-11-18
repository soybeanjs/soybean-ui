<script setup lang="ts">
import { CalendarGrid, type CalendarGridProps } from '..';

export interface DatePickerGridProps extends CalendarGridProps {}

const props = defineProps<DatePickerGridProps>();
</script>

<template>
  <CalendarGrid v-bind="props">
    <slot />
  </CalendarGrid>
</template>
