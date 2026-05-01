<script setup lang="ts">
import { Primitive } from '../primitive';
import { useCalendarRootContext, useCalendarUi } from './context';
import type { CalendarHeadingProps } from './types';

defineOptions({
  name: 'CalendarHeading'
});

withDefaults(defineProps<CalendarHeadingProps>(), {
  as: 'div'
});

defineSlots<{
  default?: (props: { headingValue: string }) => any;
}>();

const cls = useCalendarUi('heading');
const { disabled, headingValue } = useCalendarRootContext('CalendarHeading');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :data-disabled="disabled ? '' : undefined" data-slot="heading">
    <slot :heading-value="headingValue">{{ headingValue }}</slot>
  </Primitive>
</template>
