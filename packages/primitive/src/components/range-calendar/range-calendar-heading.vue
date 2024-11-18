<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';
import { injectRangeCalendarRootContext } from './range-calendar-root.vue';

export interface RangeCalendarHeadingProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarHeadingProps>(), { as: 'div' });
defineSlots<{
  default: (props: {
    /** Current month and year */
    headingValue: string;
  }) => any;
}>();
const rootContext = injectRangeCalendarRootContext();
</script>

<template>
  <Primitive v-bind="props" :data-disabled="rootContext.disabled.value ? '' : undefined">
    <slot :heading-value="rootContext.headingValue.value">
      {{ rootContext.headingValue.value }}
    </slot>
  </Primitive>
</template>
