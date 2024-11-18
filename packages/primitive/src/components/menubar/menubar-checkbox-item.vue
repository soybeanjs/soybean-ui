<script setup lang="ts">
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from '../Menu';

import { MenuCheckboxItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

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
