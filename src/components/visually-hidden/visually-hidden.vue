<script setup lang="ts">
import { Primitive } from '../primitive';
import type { VisuallyHiddenProps } from './types';

defineOptions({
  name: 'VisuallyHidden'
});

const props = withDefaults(defineProps<VisuallyHiddenProps>(), {
  as: 'span',
  feature: 'focusable'
});
</script>

<template>
  <Primitive
    v-bind="props"
    style="
      position: absolute;
      top: -1px;
      left: -1px;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      border: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
      white-space: nowrap;
      word-wrap: normal;
    "
  >
    <slot />
  </Primitive>
</template>
