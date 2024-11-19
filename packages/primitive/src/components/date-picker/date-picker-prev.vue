<script setup lang="ts">
import { CalendarPrev } from '../calendar';
import type { DatePickerPrevPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerPrev'
});

const props = defineProps<DatePickerPrevPropsWithPrimitive>();
</script>

<template>
  <CalendarPrev v-bind="props">
    <slot />
  </CalendarPrev>
</template>
