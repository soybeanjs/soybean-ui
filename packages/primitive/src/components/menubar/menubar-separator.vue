<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuSeparator } from '../menu';
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
