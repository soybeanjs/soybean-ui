<script setup lang="ts">
import { MenuRadioGroup } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { DropdownMenuRadioGroupEmits, DropdownMenuRadioGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuRadioGroup'
});

const props = defineProps<DropdownMenuRadioGroupPropsWithPrimitive>();
const emit = defineEmits<DropdownMenuRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="forwarded">
    <slot />
  </MenuRadioGroup>
</template>
