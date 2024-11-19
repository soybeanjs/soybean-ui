<script setup lang="ts">
import { MenuRadioGroup } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { ContextMenuRadioGroupEmits, ContextMenuRadioGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuRadioGroup'
});

const props = defineProps<ContextMenuRadioGroupPropsWithPrimitive>();
const emit = defineEmits<ContextMenuRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="forwarded">
    <slot />
  </MenuRadioGroup>
</template>
