<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { MenuRadioItem } from '../menu';
import type { ContextMenuRadioItemEmits, ContextMenuRadioItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuRadioItem'
});

const props = defineProps<ContextMenuRadioItemPropsWithPrimitive>();
const emit = defineEmits<ContextMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="forwarded">
    <slot />
  </MenuRadioItem>
</template>
