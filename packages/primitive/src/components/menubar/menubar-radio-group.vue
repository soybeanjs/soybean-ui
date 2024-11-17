<script lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from '../Menu';
</script>

<script setup lang="ts">
import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../_shared';

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
