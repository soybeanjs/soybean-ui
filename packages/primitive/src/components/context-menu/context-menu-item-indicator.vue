<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuItemIndicator } from '../menu';
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
