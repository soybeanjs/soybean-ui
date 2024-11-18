<script setup lang="ts">
import type { PopperArrowProps } from '../popper';
import { PopperArrow } from '../popper';
import { useForwardExpose } from '../../composables';

export interface HoverCardArrowProps extends PopperArrowProps {}

const props = withDefaults(defineProps<HoverCardArrowProps>(), {
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
