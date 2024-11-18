<script setup lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from '../Menu';

import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';

export type ContextMenuRadioGroupEmits = MenuRadioGroupEmits;

export interface ContextMenuRadioGroupProps extends MenuRadioGroupProps {}

const props = defineProps<ContextMenuRadioGroupProps>();
const emit = defineEmits<ContextMenuRadioGroupEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuRadioGroup>
</template>
