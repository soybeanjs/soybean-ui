<script setup lang="ts">
import { CalendarHeading } from '../calendar';
import type { DatePickerHeadingPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerHeading'
});

const props = defineProps<DatePickerHeadingPropsWithPrimitive>();
</script>

<template>
  <CalendarHeading v-slot="{ headingValue }" v-bind="props">
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>
