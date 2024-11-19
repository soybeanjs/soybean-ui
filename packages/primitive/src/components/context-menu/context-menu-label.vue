<script setup lang="ts">
import { MenuLabel } from '../menu';
import { useForwardExpose } from '../../composables';
import type { ContextMenuLabelPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuLabel'
});

const props = defineProps<ContextMenuLabelPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuLabel v-bind="props">
    <slot />
  </MenuLabel>
</template>
