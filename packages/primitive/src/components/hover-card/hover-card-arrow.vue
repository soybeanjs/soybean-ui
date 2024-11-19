<script setup lang="ts">
import { PopperArrow } from '../popper';
import { useForwardExpose } from '../../composables';
import type { HoverCardArrowProps } from './types';

defineOptions({
  name: 'HoverCardArrow'
});

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
