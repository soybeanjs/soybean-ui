<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { MenuCheckboxItem } from '../menu';
import type { MenubarCheckboxItemEmits, MenubarCheckboxItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarCheckboxItem'
});

const props = defineProps<MenubarCheckboxItemPropsWithPrimitive>();

const emit = defineEmits<MenubarCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuCheckboxItem v-bind="forwarded">
    <slot />
  </MenuCheckboxItem>
</template>
