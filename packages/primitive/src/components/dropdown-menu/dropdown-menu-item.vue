<script setup lang="ts">
import type { MenuItemEmits, MenuItemProps } from '../menu';

import { MenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type DropdownMenuItemEmits = MenuItemEmits;

export interface DropdownMenuItemProps extends MenuItemProps {}

const props = defineProps<DropdownMenuItemProps>();
const emit = defineEmits<DropdownMenuItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuItem>
</template>
