<script setup lang="ts">
import { Primitive } from '../primitive';
import type { CalendarGridRowPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarGridRow'
});

const props = withDefaults(defineProps<CalendarGridRowPropsWithPrimitive>(), {
  as: 'tr'
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
