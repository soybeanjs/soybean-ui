<script setup lang="ts">
import { MenuSeparator } from '../menu';
import { useForwardExpose } from '../../composables';
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
