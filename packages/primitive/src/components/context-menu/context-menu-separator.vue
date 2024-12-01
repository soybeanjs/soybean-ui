<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuSeparator } from '../menu';
import type { ContextMenuSeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuSeparator'
});

const props = defineProps<ContextMenuSeparatorPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuSeparator v-bind="props">
    <slot />
  </MenuSeparator>
</template>
