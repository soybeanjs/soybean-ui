<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuSeparator } from '../menu';
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
