<script setup lang="ts">
import type { MenuItemEmits, MenuItemProps } from '../menu';

import { MenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type ContextMenuItemEmits = MenuItemEmits;

export interface ContextMenuItemProps extends MenuItemProps {}

const props = defineProps<MenuItemProps>();
const emit = defineEmits<MenuItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuItem>
</template>
