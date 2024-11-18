<script setup lang="ts">
import { CalendarHeadCell, type CalendarHeadCellProps } from '..';

export interface DatePickerHeadCellProps extends CalendarHeadCellProps {}

const props = defineProps<DatePickerHeadCellProps>();
</script>

<template>
  <CalendarHeadCell v-bind="props">
    <slot />
  </CalendarHeadCell>
</template>
