<script setup lang="ts">
import { Primitive } from '../primitive';
import type { CalendarHeaderPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarHeader'
});

const props = withDefaults(defineProps<CalendarHeaderPropsWithPrimitive>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
