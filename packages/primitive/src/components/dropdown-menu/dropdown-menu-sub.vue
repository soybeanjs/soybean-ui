<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { MenuSub } from '../menu';
import { useForwardExpose } from '../../composables';
import type { DropdownMenuSubEmits, DropdownMenuSubProps } from './types';

defineOptions({
  name: 'DropdownMenuSub'
});

const props = withDefaults(defineProps<DropdownMenuSubProps>(), {
  open: undefined
});

const emit = defineEmits<DropdownMenuSubEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.open,
  passive: (props.open === undefined) as false
});

useForwardExpose();
</script>

<template>
  <MenuSub v-model:open="open">
    <slot :open="open" />
  </MenuSub>
</template>
