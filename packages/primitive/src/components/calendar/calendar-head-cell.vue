<script setup lang="ts">
import { Primitive } from '../primitive';
import type { CalendarHeadCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarHeadCell'
});

const props = withDefaults(defineProps<CalendarHeadCellPropsWithPrimitive>(), {
  as: 'th'
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
