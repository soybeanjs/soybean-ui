<script setup lang="ts">
import { PopperArrow } from '../popper';
import { useForwardExpose } from '../../composables';
import type { PopoverArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopoverArrow'
});

const props = withDefaults(defineProps<PopoverArrowPropsWithPrimitive>(), {
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
