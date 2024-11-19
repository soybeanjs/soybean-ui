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
</script>

<template>
  <RovingFocusItem as-child focusable>
    <Primitive
      v-bind="props"
      :ref="forwardRef"
      @keydown="
        (event: KeyboardEvent) => {
          if (event.key === ' ') (event.currentTarget as HTMLElement)?.click();
        }
      "
    >
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
