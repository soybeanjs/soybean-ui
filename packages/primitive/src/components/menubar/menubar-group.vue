<script setup lang="ts">
import { MenuGroup } from '../menu';
import { useForwardExpose } from '../../composables';
import type { MenubarGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarGroup'
});

const props = defineProps<MenubarGroupPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuGroup v-bind="props">
    <slot />
  </MenuGroup>
</template>
