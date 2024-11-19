<script setup lang="ts">
import { DateRangeFieldInput } from '../date-range-field';
import type { DateRangePickerInputPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerInput'
});

const props = defineProps<DateRangePickerInputPropsWithPrimitive>();
</script>

<template>
  <DateRangeFieldInput v-bind="props">
    <slot />
  </DateRangeFieldInput>
</template>
