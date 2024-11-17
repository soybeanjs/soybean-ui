<script lang="ts">
import type { MenuRadioItemEmits, MenuRadioItemProps } from '../Menu';
</script>

<script setup lang="ts">
import { MenuRadioItem } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../_shared';

export type MenubarRadioItemEmits = MenuRadioItemEmits;

export interface MenubarRadioItemProps extends MenuRadioItemProps {}

const props = defineProps<MenuRadioItemProps>();
const emits = defineEmits<MenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="forwarded">
    <slot />
  </MenuRadioItem>
</template>
