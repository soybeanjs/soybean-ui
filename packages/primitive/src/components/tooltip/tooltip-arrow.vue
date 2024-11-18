<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';
import { PopperArrow } from '../popper';
import { useForwardExpose } from '../../composables';

export interface TooltipArrowProps extends PrimitiveProps {
  /**
   * The width of the arrow in pixels.
   *
   * @defaultValue 10
   */
  width?: number;

  /**
   * The height of the arrow in pixels.
   *
   * @defaultValue 5
   */
  height?: number;
}

const props = withDefaults(defineProps<TooltipArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg'
});
useForwardExpose();
</script>

<template>
  <PopperArrow v-bind="props">
    <slot />
  </PopperArrow>
</template>
