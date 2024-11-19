<script setup lang="ts">
import { MenuSubTrigger } from '../menu';
import { useForwardExpose } from '../../composables';
import type { DropdownMenuSubTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuSubTrigger'
});

const props = defineProps<DropdownMenuSubTriggerPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuSubTrigger v-bind="props">
    <slot />
  </MenuSubTrigger>
</template>
