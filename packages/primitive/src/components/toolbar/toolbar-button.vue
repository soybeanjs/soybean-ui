<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { useForwardExpose } from '../../composables';

export interface ToolbarButtonProps extends PrimitiveProps {
  disabled?: boolean;
}

const props = withDefaults(defineProps<ToolbarButtonProps>(), { as: 'button' });
const { forwardRef } = useForwardExpose();
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled">
    <Primitive :ref="forwardRef" :type="as === 'button' ? 'button' : undefined" v-bind="props">
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
