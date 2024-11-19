<script setup lang="ts">
import { MenuSubContent } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { ContextMenuSubContentEmits, ContextMenuSubContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuSubContent'
});

const props = defineProps<ContextMenuSubContentPropsWithPrimitive>();

const emit = defineEmits<ContextMenuSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuSubContent
    v-bind="forwarded"
    :style="{
      '--soybean-context-menu-content-transform-origin': 'var(--soybean-popper-transform-origin)',
      '--soybean-context-menu-content-available-width': 'var(--soybean-popper-available-width)',
      '--soybean-context-menu-content-available-height': 'var(--soybean-popper-available-height)',
      '--soybean-context-menu-trigger-width': 'var(--soybean-popper-anchor-width)',
      '--soybean-context-menu-trigger-height': 'var(--soybean-popper-anchor-height)'
    }"
  >
    <slot />
  </MenuSubContent>
</template>
