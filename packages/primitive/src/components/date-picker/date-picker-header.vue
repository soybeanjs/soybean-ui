<script setup lang="ts">
import { CalendarHeader, type CalendarHeaderProps } from '..';

export interface DatePickerHeaderProps extends CalendarHeaderProps {}

const props = defineProps<DatePickerHeaderProps>();
</script>

<template>
  <CalendarHeader v-bind="props">
    <slot />
  </CalendarHeader>
</template>
