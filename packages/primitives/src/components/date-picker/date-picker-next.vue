<script setup lang="ts">
import { CalendarNext } from '../calendar';
import type { DatePickerNextPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerNext'
});

const props = defineProps<DatePickerNextPropsWithPrimitive>();
</script>

<template>
  <CalendarNext v-slot="slotProps" v-bind="props">
    <slot v-bind="slotProps" />
  </CalendarNext>
</template>
