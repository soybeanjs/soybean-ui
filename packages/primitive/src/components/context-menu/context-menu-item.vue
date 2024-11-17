<script lang="ts">
import type { MenuItemEmits, MenuItemProps } from '../menu';
</script>

<script setup lang="ts">
import { MenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../_shared';

export type ContextMenuItemEmits = MenuItemEmits;

export interface ContextMenuItemProps extends MenuItemProps {}

const props = defineProps<MenuItemProps>();
const emits = defineEmits<MenuItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuItem>
</template>
