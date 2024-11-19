<script setup lang="ts">
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from '../menu';

import { MenuCheckboxItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type DropdownMenuCheckboxItemEmits = MenuCheckboxItemEmits;

export interface DropdownMenuCheckboxItemProps extends MenuCheckboxItemProps {}

const props = defineProps<DropdownMenuCheckboxItemProps>();
const emit = defineEmits<DropdownMenuCheckboxItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuCheckboxItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuCheckboxItem>
</template>
