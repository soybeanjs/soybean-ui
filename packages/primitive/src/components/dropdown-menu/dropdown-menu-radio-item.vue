<script lang="ts">
import type { MenuRadioItemEmits, MenuRadioItemProps } from '../Menu';
import { MenuRadioItem } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../_shared';
</script>

<script setup lang="ts">
export type DropdownMenuRadioItemEmits = MenuRadioItemEmits;

export interface DropdownMenuRadioItemProps extends MenuRadioItemProps {}

const props = defineProps<DropdownMenuRadioItemProps>();
const emits = defineEmits<DropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="forwarded">
    <slot />
  </MenuRadioItem>
</template>
