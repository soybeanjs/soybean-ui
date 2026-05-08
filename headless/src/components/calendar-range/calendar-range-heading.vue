<script setup lang="ts">
import { Primitive } from '../primitive';
import { useCalendarRangeRootContext, useCalendarRangeUi } from './context';
import type { CalendarRangeHeadingProps } from './types';

defineOptions({
  name: 'CalendarRangeHeading'
});

withDefaults(defineProps<CalendarRangeHeadingProps>(), {
  as: 'div'
});

const cls = useCalendarRangeUi('heading');
const { disabled, headingValue } = useCalendarRangeRootContext('CalendarRangeHeading');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :data-disabled="disabled ? '' : undefined" data-slot="heading">
    <slot :heading-value="headingValue">{{ headingValue }}</slot>
  </Primitive>
</template>
