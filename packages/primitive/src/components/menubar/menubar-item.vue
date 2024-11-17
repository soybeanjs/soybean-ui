<script lang="ts">
import type { MenuItemEmits, MenuItemProps } from '../menu';
</script>

<script setup lang="ts">
import { MenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../_shared';

export type MenubarItemEmits = MenuItemEmits;

export interface MenubarItemProps extends MenuItemProps {}

const props = defineProps<MenubarItemProps>();
const emits = defineEmits<MenubarItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuItem>
</template>
