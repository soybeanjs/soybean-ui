<script setup lang="ts">
import { MenuArrow } from '../menu';
import { useForwardExpose } from '../../composables';
import type { ContextMenuArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuArrow'
});

const props = withDefaults(defineProps<ContextMenuArrowPropsWithPrimitive>(), {
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
