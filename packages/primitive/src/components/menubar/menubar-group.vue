<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuGroup } from '../menu';
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
