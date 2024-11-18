<script setup lang="ts">
import type { MenuItemEmits, MenuItemProps } from '../menu';

import { MenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type DropdownMenuItemEmits = MenuItemEmits;

export interface DropdownMenuItemProps extends MenuItemProps {}

const props = defineProps<DropdownMenuItemProps>();
const emits = defineEmits<DropdownMenuItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuItem>
</template>
