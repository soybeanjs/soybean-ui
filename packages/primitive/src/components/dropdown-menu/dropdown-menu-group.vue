<script setup lang="ts">
import { MenuGroup } from '../menu';
import { useForwardExpose } from '../../composables';
import type { DropdownMenuGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuGroup'
});

const props = defineProps<DropdownMenuGroupPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuGroup v-bind="props">
    <slot />
  </MenuGroup>
</template>
