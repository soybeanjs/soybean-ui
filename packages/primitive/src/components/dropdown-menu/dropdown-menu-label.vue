<script setup lang="ts">
import { MenuLabel } from '../menu';
import { useForwardExpose } from '../../composables';
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
