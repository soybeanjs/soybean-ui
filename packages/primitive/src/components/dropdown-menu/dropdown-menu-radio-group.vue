<script lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from '../Menu';
</script>

<script setup lang="ts">
import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../_shared';

export type DropdownMenuRadioGroupEmits = MenuRadioGroupEmits;

export interface DropdownMenuRadioGroupProps extends MenuRadioGroupProps {}

const props = defineProps<MenuRadioGroupProps>();
const emits = defineEmits<MenuRadioGroupEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuRadioGroup>
</template>
