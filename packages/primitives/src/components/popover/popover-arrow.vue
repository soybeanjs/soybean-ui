<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { PopperArrow } from '../popper';
import type { PopoverArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopoverArrow'
});

const props = withDefaults(defineProps<PopoverArrowPropsWithPrimitive>(), {
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
