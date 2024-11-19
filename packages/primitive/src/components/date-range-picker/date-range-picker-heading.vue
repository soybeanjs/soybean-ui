<script setup lang="ts">
import { RangeCalendarHeading } from '../range-calendar';
import type { DateRangePickerHeadingPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerHeading'
});

const props = defineProps<DateRangePickerHeadingPropsWithPrimitive>();
</script>

<template>
  <RangeCalendarHeading v-slot="{ headingValue }" v-bind="props">
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </RangeCalendarHeading>
</template>
