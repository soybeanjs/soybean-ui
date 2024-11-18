<script setup lang="ts">
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from '../Menu';

import { MenuCheckboxItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type DropdownMenuCheckboxItemEmits = MenuCheckboxItemEmits;

export interface DropdownMenuCheckboxItemProps extends MenuCheckboxItemProps {}

const props = defineProps<DropdownMenuCheckboxItemProps>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuCheckboxItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuCheckboxItem>
</template>
