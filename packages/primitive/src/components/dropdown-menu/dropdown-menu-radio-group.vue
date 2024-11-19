<script setup lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from '../menu';

import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type DropdownMenuRadioGroupEmits = MenuRadioGroupEmits;

export interface DropdownMenuRadioGroupProps extends MenuRadioGroupProps {}

const props = defineProps<MenuRadioGroupProps>();
const emit = defineEmits<MenuRadioGroupEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuRadioGroup>
</template>
