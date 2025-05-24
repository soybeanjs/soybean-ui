<script setup lang="ts">
import { Primitive } from '../primitive';
import type { VisuallyHiddenProps } from './types';

defineOptions({
  name: 'VisuallyHidden'
});

withDefaults(defineProps<VisuallyHiddenProps>(), {
  as: 'span',
  feature: 'focusable'
});
</script>

<template>
  <Primitive
    :as="as"
    style="
      position: absolute;
      border: 0;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
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
