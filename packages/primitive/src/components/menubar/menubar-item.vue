<script setup lang="ts">
import type { MenuItemEmits, MenuItemProps } from '../menu';

import { MenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type MenubarItemEmits = MenuItemEmits;

export interface MenubarItemProps extends MenuItemProps {}

const props = defineProps<MenubarItemProps>();
const emit = defineEmits<MenubarItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuItem>
</template>
