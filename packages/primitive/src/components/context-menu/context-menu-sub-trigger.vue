<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { MenuSubTrigger } from '../menu';
import type { ContextMenuSubTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuSubTrigger'
});

const props = defineProps<ContextMenuSubTriggerPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuSubTrigger v-bind="props">
    <slot />
  </MenuSubTrigger>
</template>
