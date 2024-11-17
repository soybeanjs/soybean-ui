<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './calendar-root.vue';

export interface CalendarHeadingProps extends PrimitiveProps {}

const props = withDefaults(defineProps<CalendarHeadingProps>(), { as: 'div' });

defineSlots<{
  default: (props: {
    /** Current month and year */
    headingValue: string;
  }) => any;
}>();

const rootContext = injectCalendarRootContext();
</script>

<template>
  <Primitive v-bind="props" :data-disabled="rootContext.disabled.value ? '' : undefined">
    <slot :heading-value="rootContext.headingValue.value">
      {{ rootContext.headingValue.value }}
    </slot>
  </Primitive>
</template>
