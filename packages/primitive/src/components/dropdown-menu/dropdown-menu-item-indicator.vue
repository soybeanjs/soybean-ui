<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuItemIndicator } from '../menu';
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
