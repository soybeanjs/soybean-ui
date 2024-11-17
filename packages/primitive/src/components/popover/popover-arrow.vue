<script lang="ts">
import type { PopperArrowProps } from '../popper';
import { PopperArrow } from '../popper';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
export interface PopoverArrowProps extends PopperArrowProps {}

const props = withDefaults(defineProps<PopoverArrowProps>(), {
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
