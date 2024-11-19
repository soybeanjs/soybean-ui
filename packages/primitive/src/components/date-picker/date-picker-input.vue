<script setup lang="ts">
import DateFieldInput from '../date-field/date-field-input.vue';
import type { DateFieldInputProps } from '../date-field';

defineOptions({
  name: 'DatePickerInput'
});

export interface DatePickerInputProps extends DateFieldInputProps {}

const props = defineProps<DatePickerInputProps>();
</script>

<template>
  <DateFieldInput v-bind="props">
    <slot />
  </DateFieldInput>
</template>
