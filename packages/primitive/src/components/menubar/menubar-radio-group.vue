<script setup lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from '../Menu';

import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type MenubarRadioGroupEmits = MenuRadioGroupEmits;

export interface MenubarRadioGroupProps extends MenuRadioGroupProps {}

const props = defineProps<MenubarRadioGroupProps>();
const emit = defineEmits<MenubarRadioGroupEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuRadioGroup>
</template>
