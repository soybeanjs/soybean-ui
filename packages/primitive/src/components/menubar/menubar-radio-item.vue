<script setup lang="ts">
import type { MenuRadioItemEmits, MenuRadioItemProps } from '../menu';

import { MenuRadioItem } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';

export type MenubarRadioItemEmits = MenuRadioItemEmits;

export interface MenubarRadioItemProps extends MenuRadioItemProps {}

const props = defineProps<MenuRadioItemProps>();
const emit = defineEmits<MenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="forwarded">
    <slot />
  </MenuRadioItem>
</template>
