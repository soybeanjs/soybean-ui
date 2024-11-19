<script setup lang="ts">
import type { MenuRadioItemEmits, MenuRadioItemProps } from '../menu';
import { MenuRadioItem } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';

export type DropdownMenuRadioItemEmits = MenuRadioItemEmits;

export interface DropdownMenuRadioItemProps extends MenuRadioItemProps {}

const props = defineProps<DropdownMenuRadioItemProps>();
const emit = defineEmits<DropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="forwarded">
    <slot />
  </MenuRadioItem>
</template>
