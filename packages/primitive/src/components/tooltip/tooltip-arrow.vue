<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { PopperArrow } from '../popper';
import type { TooltipArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'TooltipArrow'
});

const props = withDefaults(defineProps<TooltipArrowPropsWithPrimitive>(), {
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
