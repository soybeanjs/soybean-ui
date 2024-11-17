<script lang="ts">
import type { MenuLabelProps } from '../menu';
</script>

<script setup lang="ts">
import { MenuLabel } from '../menu';
import { useForwardExpose } from '../../composables';

export interface ContextMenuLabelProps extends MenuLabelProps {}

const props = defineProps<ContextMenuLabelProps>();
useForwardExpose();
</script>

<template>
  <MenuLabel v-bind="props">
    <slot />
  </MenuLabel>
</template>
