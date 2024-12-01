<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { MenuItem } from '../menu';
import type { MenubarItemEmits, MenubarItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarItem'
});

const props = defineProps<MenubarItemPropsWithPrimitive>();
const emit = defineEmits<MenubarItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();
</script>

<template>
  <MenuItem v-bind="forwarded">
    <slot />
  </MenuItem>
</template>
