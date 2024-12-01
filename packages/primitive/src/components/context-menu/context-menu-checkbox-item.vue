<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { MenuCheckboxItem } from '../menu';
import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuCheckboxItem'
});

const props = defineProps<ContextMenuCheckboxItemPropsWithPrimitive>();
const emit = defineEmits<ContextMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuCheckboxItem v-bind="forwarded">
    <slot />
  </MenuCheckboxItem>
</template>
