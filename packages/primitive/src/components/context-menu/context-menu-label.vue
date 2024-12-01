<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuLabel } from '../menu';
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
