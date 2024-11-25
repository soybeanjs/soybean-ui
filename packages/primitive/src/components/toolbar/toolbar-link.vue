<script setup lang="ts">
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { useForwardExpose } from '../../composables';
import type { ToolbarLinkPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToolbarLink'
});

const props = withDefaults(defineProps<ToolbarLinkPropsWithPrimitive>(), {
  as: 'a'
});

const { forwardRef } = useForwardExpose();

function onKeyDown(event: KeyboardEvent) {
  if (event.key === ' ') {
    (event.currentTarget as HTMLElement)?.click();
  }
}
</script>

<template>
  <RovingFocusItem as-child focusable>
    <Primitive v-bind="props" :ref="forwardRef" @keydown="onKeyDown">
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
