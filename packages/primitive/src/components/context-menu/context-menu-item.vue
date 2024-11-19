<script setup lang="ts">
import { MenuItem } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { ContextMenuItemEmits, ContextMenuItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuItem'
});

const props = defineProps<ContextMenuItemPropsWithPrimitive>();
const emit = defineEmits<ContextMenuItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();
</script>

<template>
  <MenuItem v-bind="forwarded">
    <slot />
  </MenuItem>
</template>
