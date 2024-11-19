<script setup lang="ts">
import { MenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';
import type { DropdownMenuItemEmits, DropdownMenuItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuItem'
});

const props = defineProps<DropdownMenuItemPropsWithPrimitive>();
const emit = defineEmits<DropdownMenuItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuItem>
</template>
