<script setup lang="ts">
import { MenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';
import type { MenubarItemEmits, MenubarItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarItem'
});

const props = defineProps<MenubarItemPropsWithPrimitive>();
const emit = defineEmits<MenubarItemEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuItem v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuItem>
</template>
