<script setup lang="ts">
import { MenuGroup } from '../menu';
import { useForwardExpose } from '../../composables';
import type { ContextMenuRadioGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuGroup'
});

const props = defineProps<ContextMenuRadioGroupPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuGroup v-bind="props">
    <slot />
  </MenuGroup>
</template>
