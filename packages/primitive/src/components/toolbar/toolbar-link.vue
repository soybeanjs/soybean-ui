<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { useForwardExpose } from '../../composables';

export interface ToolbarLinkProps extends PrimitiveProps {}

const props = withDefaults(defineProps<ToolbarLinkProps>(), { as: 'a' });
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
