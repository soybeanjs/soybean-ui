<script setup lang="ts">
import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';
import type { DropdownMenuRadioGroupEmits, DropdownMenuRadioGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuRadioGroup'
});

const props = defineProps<DropdownMenuRadioGroupPropsWithPrimitive>();
const emit = defineEmits<DropdownMenuRadioGroupEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuRadioGroup>
</template>
