<script setup lang="ts">
import { CalendarGridHead } from '../calendar';
import type { DatePickerGridHeadPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerGridHead'
});

const props = defineProps<DatePickerGridHeadPropsWithPrimitive>();
</script>

<template>
  <CalendarGridHead v-bind="props">
    <slot />
  </CalendarGridHead>
</template>
