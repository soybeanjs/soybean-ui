<script setup lang="ts">
import type { MenuItemIndicatorProps } from '../menu';
import { MenuItemIndicator } from '../menu';
import { useForwardExpose } from '../../composables';

export interface DropdownMenuItemIndicatorProps extends MenuItemIndicatorProps {}

const props = defineProps<DropdownMenuItemIndicatorProps>();
useForwardExpose();
</script>

<template>
  <MenuItemIndicator v-bind="props">
    <slot />
  </MenuItemIndicator>
</template>
