<script setup lang="ts">
import { CalendarHeader } from '../calendar';
import type { DatePickerHeaderPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerHeader'
});

const props = defineProps<DatePickerHeaderPropsWithPrimitive>();
</script>

<template>
  <CalendarHeader v-bind="props">
    <slot />
  </CalendarHeader>
</template>
