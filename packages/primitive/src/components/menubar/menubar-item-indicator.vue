<script setup lang="ts">
import type { MenuItemIndicatorProps } from '../menu';
import { MenuItemIndicator } from '../menu';
import { useForwardExpose } from '../../composables';

export interface MenubarItemIndicatorProps extends MenuItemIndicatorProps {}

const props = defineProps<MenubarItemIndicatorProps>();
useForwardExpose();
</script>

<template>
  <MenuItemIndicator v-bind="props">
    <slot />
  </MenuItemIndicator>
</template>
