<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectRangeCalendarRootContext } from './context';
import type { RangeCalendarHeadingPropsWithPrimitive } from './types';

defineOptions({
  name: 'RangeCalendarHeading'
});

const props = withDefaults(defineProps<RangeCalendarHeadingPropsWithPrimitive>(), {
  as: 'div'
});

const rootContext = injectRangeCalendarRootContext();
</script>

<template>
  <Primitive v-bind="props" :data-disabled="rootContext.disabled.value ? '' : undefined">
    <slot :heading-value="rootContext.headingValue.value">
      {{ rootContext.headingValue.value }}
    </slot>
  </Primitive>
</template>
