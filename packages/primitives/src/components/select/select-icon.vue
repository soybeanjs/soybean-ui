<script setup lang="ts">
import { Primitive } from '../primitive';
import type { SelectIconPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectIcon'
});

const props = withDefaults(defineProps<SelectIconPropsWithPrimitive>(), {
  as: 'span'
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild" aria-hidden="true">
    <slot>▼</slot>
  </Primitive>
</template>
