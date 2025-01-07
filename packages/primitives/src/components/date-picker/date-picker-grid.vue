<script setup lang="ts">
import { CalendarGrid } from '../calendar';
import type { DatePickerGridPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerGrid'
});

const props = defineProps<DatePickerGridPropsWithPrimitive>();
</script>

<template>
  <CalendarGrid v-bind="props">
    <slot />
  </CalendarGrid>
</template>
