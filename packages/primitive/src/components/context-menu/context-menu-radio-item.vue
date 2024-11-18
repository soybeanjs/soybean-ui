<script setup lang="ts">
import type { MenuItemEmits, MenuRadioItemProps } from '../Menu';

import { MenuRadioItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type ContextMenuRadioItemEmits = MenuItemEmits;

export interface ContextMenuRadioItemProps extends MenuRadioItemProps {}

const props = defineProps<ContextMenuRadioItemProps>();
const emits = defineEmits<ContextMenuRadioItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuRadioItem>
</template>
