<script setup lang="ts">
import { CalendarGridRow } from '../calendar';
import type { DatePickerGridRowPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerGridRow'
});

const props = defineProps<DatePickerGridRowPropsWithPrimitive>();
</script>

<template>
  <CalendarGridRow v-bind="props">
    <slot />
  </CalendarGridRow>
</template>
