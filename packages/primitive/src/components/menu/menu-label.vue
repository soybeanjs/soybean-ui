<script setup lang="ts">
import { Primitive } from '../primitive';
import type { MenuLabelPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuLabel'
});

const props = withDefaults(defineProps<MenuLabelPropsWithPrimitive>(), {
  as: 'div'
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
