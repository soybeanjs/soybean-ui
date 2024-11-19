<script setup lang="ts">
import { MenuRadioItem } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { MenubarRadioItemEmits, MenubarRadioItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarRadioItem'
});

const props = defineProps<MenubarRadioItemPropsWithPrimitive>();
const emit = defineEmits<MenubarRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuRadioItem v-bind="forwarded">
    <slot />
  </MenuRadioItem>
</template>
