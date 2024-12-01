<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuGroup } from '../menu';
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
