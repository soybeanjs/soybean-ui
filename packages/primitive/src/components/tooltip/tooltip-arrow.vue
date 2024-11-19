<script setup lang="ts">
import { PopperArrow } from '../popper';
import { useForwardExpose } from '../../composables';
import type { TooltipArrowProps } from './types';

defineOptions({
  name: 'TooltipArrow'
});

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
