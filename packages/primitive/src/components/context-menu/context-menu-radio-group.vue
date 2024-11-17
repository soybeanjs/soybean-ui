<script lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from '../Menu';
</script>

<script setup lang="ts">
import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../_shared';

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
