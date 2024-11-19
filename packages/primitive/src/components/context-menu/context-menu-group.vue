<script setup lang="ts">
import { MenuGroup } from '../menu';
import { useForwardExpose } from '../../composables';
import type { ContextMenuGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuGroup'
});

const props = defineProps<ContextMenuGroupPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuGroup v-bind="props">
    <slot />
  </MenuGroup>
</template>
