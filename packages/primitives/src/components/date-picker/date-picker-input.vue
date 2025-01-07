<script setup lang="ts">
import { DateFieldInput } from '../date-field';
import type { DatePickerInputPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerInput'
});

const props = defineProps<DatePickerInputPropsWithPrimitive>();
</script>

<template>
  <DateFieldInput v-bind="props">
    <slot />
  </DateFieldInput>
</template>
