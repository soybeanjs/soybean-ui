<script setup lang="ts">
import type { MenuItemIndicatorProps } from '../menu';
import { MenuItemIndicator } from '../menu';
import { useForwardExpose } from '../../composables';

export interface ContextMenuItemIndicatorProps extends MenuItemIndicatorProps {}

const props = defineProps<ContextMenuItemIndicatorProps>();
useForwardExpose();
</script>

<template>
  <MenuItemIndicator v-bind="props">
    <slot />
  </MenuItemIndicator>
</template>
