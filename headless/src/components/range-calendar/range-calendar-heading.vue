<script setup lang="ts">
import { Primitive } from '../primitive';
import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarHeadingProps } from './types';

defineOptions({
  name: 'RangeCalendarHeading'
});

withDefaults(defineProps<RangeCalendarHeadingProps>(), {
  as: 'div'
});

defineSlots<{
  default?: (props: { headingValue: string }) => any;
}>();

const cls = useRangeCalendarUi('heading');
const { disabled, headingValue } = useRangeCalendarRootContext('RangeCalendarHeading');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :data-disabled="disabled ? '' : undefined" data-slot="heading">
    <slot :heading-value="headingValue">{{ headingValue }}</slot>
  </Primitive>
</template>
