<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { LabelPropsWithPrimitive } from './types';

defineOptions({
  name: 'PrimitiveLabel'
});

const props = withDefaults(defineProps<LabelPropsWithPrimitive>(), {
  as: 'label'
});

function handleMouseDown(event: MouseEvent) {
  // prevent text selection when double clicking label
  if (!event.defaultPrevented && event.detail > 1) {
    event.preventDefault();
  }
}

useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" @mousedown="handleMouseDown">
    <slot />
  </Primitive>
</template>
