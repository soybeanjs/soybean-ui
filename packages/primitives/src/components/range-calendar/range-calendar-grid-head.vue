<script setup lang="ts">
import { Primitive } from '../primitive';
import type { RangeCalendarGridHeadPropsWithPrimitive } from './types';

defineOptions({
  name: 'RangeCalendarGridHead'
});

const props = withDefaults(defineProps<RangeCalendarGridHeadPropsWithPrimitive>(), {
  as: 'thead'
});
</script>

<template>
  <Primitive v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
