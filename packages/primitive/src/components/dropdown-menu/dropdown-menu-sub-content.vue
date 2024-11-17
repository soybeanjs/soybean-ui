<script lang="ts">
import type { MenuSubContentEmits, MenuSubContentProps } from '../Menu';
import { MenuSubContent } from '../menu';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { useForwardPropsEmits } from '..';

export type DropdownMenuSubContentEmits = MenuSubContentEmits;

export interface DropdownMenuSubContentProps extends MenuSubContentProps {}

const props = defineProps<DropdownMenuSubContentProps>();
const emits = defineEmits<DropdownMenuSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();
</script>

<template>
  <MenuSubContent
    v-bind="forwarded"
    :style="{
      '--soybean-dropdown-menu-content-transform-origin': 'var(--soybean-popper-transform-origin)',
      '--soybean-dropdown-menu-content-available-width': 'var(--soybean-popper-available-width)',
      '--soybean-dropdown-menu-content-available-height': 'var(--soybean-popper-available-height)',
      '--soybean-dropdown-menu-trigger-width': 'var(--soybean-popper-anchor-width)',
      '--soybean-dropdown-menu-trigger-height': 'var(--soybean-popper-anchor-height)'
    }"
  >
    <slot />
  </MenuSubContent>
</template>
