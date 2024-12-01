<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuLabel } from '../menu';
import type { MenubarLabelPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarLabel'
});

const props = defineProps<MenubarLabelPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuLabel v-bind="props">
    <slot />
  </MenuLabel>
</template>
