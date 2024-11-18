<script setup lang="ts">
import { CalendarGridHead, type CalendarGridHeadProps } from '..';

export interface DatePickerGridHeadProps extends CalendarGridHeadProps {}

const props = defineProps<DatePickerGridHeadProps>();
</script>

<template>
  <CalendarGridHead v-bind="props">
    <slot />
  </CalendarGridHead>
</template>
