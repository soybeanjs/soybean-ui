<script setup lang="ts">
import { MenuSeparator } from '../menu';
import { useForwardExpose } from '../../composables';
import type { MenubarSeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarSeparator'
});

const props = defineProps<MenubarSeparatorPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuSeparator v-bind="props">
    <slot />
  </MenuSeparator>
</template>
