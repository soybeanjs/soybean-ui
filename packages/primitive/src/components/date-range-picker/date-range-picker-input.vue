<script setup lang="ts">
import { DateRangeFieldInput, type DateRangeFieldInputProps } from '..';

export interface DateRangePickerInputProps extends DateRangeFieldInputProps {}

const props = defineProps<DateRangePickerInputProps>();
</script>

<template>
  <DateRangeFieldInput v-bind="props">
    <slot />
  </DateRangeFieldInput>
</template>
