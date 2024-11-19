<script setup lang="ts">
import { MenuArrow } from '../menu';
import { useForwardExpose } from '../../composables';
import type { DropdownMenuArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuArrow'
});

const props = withDefaults(defineProps<DropdownMenuArrowPropsWithPrimitive>(), {
  width: 10,
  height: 5,
  as: 'svg'
});
useForwardExpose();
</script>

<template>
  <MenuArrow v-bind="props">
    <slot />
  </MenuArrow>
</template>
