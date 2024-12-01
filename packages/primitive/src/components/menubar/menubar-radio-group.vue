<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { MenuRadioGroup } from '../menu';
import type { MenubarRadioGroupEmits, MenubarRadioGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarRadioGroup'
});

const props = defineProps<MenubarRadioGroupPropsWithPrimitive>();
const emit = defineEmits<MenubarRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="forwarded">
    <slot />
  </MenuRadioGroup>
</template>
