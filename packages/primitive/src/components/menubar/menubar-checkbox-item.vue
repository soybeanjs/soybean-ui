<script setup lang="ts">
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from '../Menu';

import { MenuCheckboxItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type MenubarCheckboxItemEmits = MenuCheckboxItemEmits;

export interface MenubarCheckboxItemProps extends MenuCheckboxItemProps {}

const props = defineProps<MenubarCheckboxItemProps>();
const emit = defineEmits<MenubarCheckboxItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuCheckboxItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuCheckboxItem>
</template>
