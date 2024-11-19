<script setup lang="ts">
import { MenuCheckboxItem } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuCheckboxItem'
});

const props = defineProps<DropdownMenuCheckboxItemPropsWithPrimitive>();
const emit = defineEmits<DropdownMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();
</script>

<template>
  <MenuCheckboxItem v-bind="forwarded">
    <slot />
  </MenuCheckboxItem>
</template>
