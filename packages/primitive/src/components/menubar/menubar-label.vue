<script setup lang="ts">
import type { MenuLabelProps } from '../menu';
import { MenuLabel } from '../menu';
import { useForwardExpose } from '../../composables';

export interface MenubarLabelProps extends MenuLabelProps {}

const props = defineProps<MenubarLabelProps>();
useForwardExpose();
</script>

<template>
  <MenuLabel v-bind="props">
    <slot />
  </MenuLabel>
</template>
