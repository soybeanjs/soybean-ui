<script setup lang="ts">
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from '../Menu';

import { MenuCheckboxItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type ContextMenuCheckboxItemEmits = MenuCheckboxItemEmits;

export interface ContextMenuCheckboxItemProps extends MenuCheckboxItemProps {}

const props = defineProps<ContextMenuCheckboxItemProps>();
const emit = defineEmits<ContextMenuCheckboxItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuCheckboxItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuCheckboxItem>
</template>
