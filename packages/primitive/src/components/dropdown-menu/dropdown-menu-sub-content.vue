<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import MenuSubContent from '../menu/menu-sub-content.vue';
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuSubContent'
});

const props = defineProps<DropdownMenuSubContentPropsWithPrimitive>();

const emit = defineEmits<DropdownMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const style = computed<Record<string, string>>(() => ({
  '--soybean-dropdown-menu-content-transform-origin': 'var(--soybean-popper-transform-origin)',
  '--soybean-dropdown-menu-content-available-width': 'var(--soybean-popper-available-width)',
  '--soybean-dropdown-menu-content-available-height': 'var(--soybean-popper-available-height)',
  '--soybean-dropdown-menu-trigger-width': 'var(--soybean-popper-anchor-width)',
  '--soybean-dropdown-menu-trigger-height': 'var(--soybean-popper-anchor-height)'
}));

useForwardExpose();
</script>

<template>
  <MenuSubContent v-bind="forwarded" :style="style">
    <slot />
  </MenuSubContent>
</template>
