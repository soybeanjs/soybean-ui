<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';

export interface MenuLabelProps extends PrimitiveProps {}

const props = withDefaults(defineProps<MenuLabelProps>(), {
  as: 'div'
});
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
