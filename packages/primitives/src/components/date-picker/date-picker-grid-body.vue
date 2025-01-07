<script setup lang="ts">
import { CalendarGridBody } from '../calendar';
import type { DatePickerGridBodyPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerGridBody'
});

const props = defineProps<DatePickerGridBodyPropsWithPrimitive>();
</script>

<template>
  <CalendarGridBody v-bind="props">
    <slot />
  </CalendarGridBody>
</template>
