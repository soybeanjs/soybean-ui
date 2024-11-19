<script setup lang="ts">
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { useForwardExpose } from '../../composables';
import type { ToolbarButtonPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToolbarButton'
});

const props = withDefaults(defineProps<ToolbarButtonPropsWithPrimitive>(), {
  as: 'button'
});

const { forwardRef } = useForwardExpose();
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled">
    <Primitive :ref="forwardRef" :type="as === 'button' ? 'button' : undefined" v-bind="props">
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
