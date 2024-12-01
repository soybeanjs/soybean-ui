<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuArrow } from '../menu';
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
