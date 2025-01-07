<script setup lang="ts">
import { Primitive } from '../primitive';
import type { RangeCalendarGridBodyPropsWithPrimitive } from './types';

defineOptions({
  name: 'RangeCalendarGridBody'
});

const props = withDefaults(defineProps<RangeCalendarGridBodyPropsWithPrimitive>(), {
  as: 'tbody'
});
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
