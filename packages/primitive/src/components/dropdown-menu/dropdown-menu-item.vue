<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { MenuItem } from '../menu';
import type { DropdownMenuItemEmits, DropdownMenuItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuItem'
});

const props = defineProps<DropdownMenuItemPropsWithPrimitive>();
const emit = defineEmits<DropdownMenuItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();
</script>

<template>
  <MenuItem v-bind="forwarded">
    <slot />
  </MenuItem>
</template>
