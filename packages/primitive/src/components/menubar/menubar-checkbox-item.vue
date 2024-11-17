<script lang="ts">
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from '../Menu';
</script>

<script setup lang="ts">
import { MenuCheckboxItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../_shared';

export type MenubarCheckboxItemEmits = MenuCheckboxItemEmits;

export interface MenubarCheckboxItemProps extends MenuCheckboxItemProps {}

const props = defineProps<MenubarCheckboxItemProps>();
const emits = defineEmits<MenubarCheckboxItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuCheckboxItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuCheckboxItem>
</template>
