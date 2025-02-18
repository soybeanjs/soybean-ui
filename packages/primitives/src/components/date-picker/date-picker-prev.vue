<script setup lang="ts">
import { CalendarPrev } from '../calendar';
import type { DatePickerPrevPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerPrev'
});

const props = defineProps<DatePickerPrevPropsWithPrimitive>();
</script>

<template>
  <CalendarPrev v-slot="slotProps" v-bind="props">
    <slot v-bind="slotProps" />
  </CalendarPrev>
</template>
