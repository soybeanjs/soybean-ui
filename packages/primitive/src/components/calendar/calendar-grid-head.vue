<script setup lang="ts">
import { Primitive } from '../primitive';
import type { CalendarGridHeadPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarGridHead'
});

const props = withDefaults(defineProps<CalendarGridHeadPropsWithPrimitive>(), {
  as: 'thead'
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild" aria-hidden="true">
    <slot />
  </Primitive>
</template>
