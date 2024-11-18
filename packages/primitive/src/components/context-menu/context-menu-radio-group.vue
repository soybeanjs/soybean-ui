<script setup lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from '../Menu';

import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type ContextMenuRadioGroupEmits = MenuRadioGroupEmits;

export interface ContextMenuRadioGroupProps extends MenuRadioGroupProps {}

const props = defineProps<ContextMenuRadioGroupProps>();
const emits = defineEmits<ContextMenuRadioGroupEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </MenuRadioGroup>
</template>
