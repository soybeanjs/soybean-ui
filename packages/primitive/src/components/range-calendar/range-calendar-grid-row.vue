<script setup lang="ts">
import { Primitive } from '../primitive';
import type { RangeCalendarGridRowPropsWithPrimitive } from './types';

defineOptions({
  name: 'RangeCalendarGridRow'
});

const props = withDefaults(defineProps<RangeCalendarGridRowPropsWithPrimitive>(), {
  as: 'tr'
});
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
