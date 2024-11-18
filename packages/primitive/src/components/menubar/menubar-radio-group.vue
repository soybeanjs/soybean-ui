<script setup lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from '../Menu';

import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type MenubarRadioGroupEmits = MenuRadioGroupEmits;

export interface MenubarRadioGroupProps extends MenuRadioGroupProps {}

const props = defineProps<MenubarRadioGroupProps>();
const emits = defineEmits<MenubarRadioGroupEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuRadioGroup>
</template>
