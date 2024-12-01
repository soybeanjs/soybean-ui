<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuLabel } from '../menu';
import type { DropdownMenuLabelPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuLabel'
});

const props = defineProps<DropdownMenuLabelPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuLabel v-bind="props">
    <slot />
  </MenuLabel>
</template>
