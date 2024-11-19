<script setup lang="ts">
import { MenuItemIndicator } from '../menu';
import { useForwardExpose } from '../../composables';
import type { DropdownMenuItemIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuItemIndicator'
});

const props = defineProps<DropdownMenuItemIndicatorPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuItemIndicator v-bind="props">
    <slot />
  </MenuItemIndicator>
</template>
