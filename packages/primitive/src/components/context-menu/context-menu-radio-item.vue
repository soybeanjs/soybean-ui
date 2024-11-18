<script setup lang="ts">
import type { MenuItemEmits, MenuRadioItemProps } from '../Menu';

import { MenuRadioItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type ContextMenuRadioItemEmits = MenuItemEmits;

export interface ContextMenuRadioItemProps extends MenuRadioItemProps {}

const props = defineProps<ContextMenuRadioItemProps>();
const emit = defineEmits<ContextMenuRadioItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuRadioItem>
</template>
