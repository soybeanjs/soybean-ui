<script setup lang="ts">
import { MenuItemIndicator } from '../menu';
import { useForwardExpose } from '../../composables';
import type { ContextMenuItemIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuItemIndicator'
});

const props = defineProps<ContextMenuItemIndicatorPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuItemIndicator v-bind="props">
    <slot />
  </MenuItemIndicator>
</template>
