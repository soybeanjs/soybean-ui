<script setup lang="ts">
import { MenuRadioItem } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuRadioItem'
});

const props = defineProps<DropdownMenuRadioItemPropsWithPrimitive>();
const emit = defineEmits<DropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="forwarded">
    <slot />
  </MenuRadioItem>
</template>
