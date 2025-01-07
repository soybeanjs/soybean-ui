<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { PopperArrow } from '../popper';
import type { HoverCardArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'HoverCardArrow'
});

const props = withDefaults(defineProps<HoverCardArrowPropsWithPrimitive>(), {
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
