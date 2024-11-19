<script setup lang="ts">
import { MenuItemIndicator } from '../menu';
import { useForwardExpose } from '../../composables';
import type { MenubarItemIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarItemIndicator'
});

const props = defineProps<MenubarItemIndicatorPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuItemIndicator v-bind="props">
    <slot />
  </MenuItemIndicator>
</template>
