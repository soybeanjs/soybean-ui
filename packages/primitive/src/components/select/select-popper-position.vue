<script lang="ts">
import type { PopperContentProps } from '../popper';
</script>

<script setup lang="ts">
import { PopperContent } from '../popper';
import { useForwardProps } from '..';
import { CONTENT_MARGIN } from './utils';

export interface SelectPopperPositionProps extends PopperContentProps {}

const props = withDefaults(defineProps<SelectPopperPositionProps>(), {
  align: 'start',
  collisionPadding: CONTENT_MARGIN
});
const forwarded = useForwardProps(props);
</script>

<template>
  <PopperContent
    v-bind="forwarded"
    :style="{
      // Ensure border-box for floating-ui calculations
      boxSizing: 'border-box',
      '--soybean-select-content-transform-origin': 'var(--soybean-popper-transform-origin)',
      '--soybean-select-content-available-width': 'var(--soybean-popper-available-width)',
      '--soybean-select-content-available-height': 'var(--soybean-popper-available-height)',
      '--soybean-select-trigger-width': 'var(--soybean-popper-anchor-width)',
      '--soybean-select-trigger-height': 'var(--soybean-popper-anchor-height)'
    }"
  >
    <slot />
  </PopperContent>
</template>
