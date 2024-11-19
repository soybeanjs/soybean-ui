<script setup lang="ts">
import { CalendarCellTrigger } from '../calendar';
import type { DatePickerCellTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerCellTrigger'
});

const props = defineProps<DatePickerCellTriggerPropsWithPrimitive>();
</script>

<template>
  <CalendarCellTrigger v-bind="props">
    <slot />
  </CalendarCellTrigger>
</template>
