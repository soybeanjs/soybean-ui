<script setup lang="ts">
import type { MenuLabelProps } from '../menu';
import { MenuLabel } from '../menu';
import { useForwardExpose } from '../../composables';

export interface DropdownMenuLabelProps extends MenuLabelProps {}

const props = defineProps<DropdownMenuLabelProps>();
useForwardExpose();
</script>

<template>
  <MenuLabel v-bind="props">
    <slot />
  </MenuLabel>
</template>
