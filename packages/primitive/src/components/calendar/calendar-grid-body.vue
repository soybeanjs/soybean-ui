<script setup lang="ts">
import { Primitive } from '../primitive';
import type { CalendarGridBodyPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarGridBody'
});

const props = withDefaults(defineProps<CalendarGridBodyPropsWithPrimitive>(), {
  as: 'tbody'
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
