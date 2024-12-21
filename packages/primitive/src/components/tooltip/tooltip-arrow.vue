<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { PopperArrow } from '../popper';
import type { TooltipArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'TooltipArrow'
});

const props = withDefaults(defineProps<TooltipArrowPropsWithPrimitive>(), {
  width: 12,
  height: 6,
  as: 'svg'
});

useForwardExpose();
</script>

<template>
  <PopperArrow v-bind="props">
    <slot />
  </PopperArrow>
</template>
