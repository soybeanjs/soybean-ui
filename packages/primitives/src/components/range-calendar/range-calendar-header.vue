<script setup lang="ts">
import { Primitive } from '../primitive';
import type { RangeCalendarHeaderPropsWithPrimitive } from './types';

defineOptions({
  name: 'RangeCalendarHeader'
});

const props = withDefaults(defineProps<RangeCalendarHeaderPropsWithPrimitive>(), {
  as: 'div'
});
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
