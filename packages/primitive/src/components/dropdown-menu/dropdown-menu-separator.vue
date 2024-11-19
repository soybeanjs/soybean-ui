<script setup lang="ts">
import { MenuSeparator } from '../menu';
import { useForwardExpose } from '../../composables';
import type { DropdownMenuSeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuSeparator'
});

const props = defineProps<DropdownMenuSeparatorPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuSeparator v-bind="props">
    <slot />
  </MenuSeparator>
</template>
