<script setup lang="ts">
import { Primitive } from '../primitive';
import type { RangeCalendarHeadCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'RangeCalendarHeadCell'
});

const props = withDefaults(defineProps<RangeCalendarHeadCellPropsWithPrimitive>(), { as: 'th' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
