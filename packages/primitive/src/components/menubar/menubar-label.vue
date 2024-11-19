<script setup lang="ts">
import { MenuLabel } from '../menu';
import { useForwardExpose } from '../../composables';
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
