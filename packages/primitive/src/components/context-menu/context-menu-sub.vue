<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { useForwardExpose } from '../../composables';
import { MenuSub } from '../menu';
import type { ContextMenuSubEmits, ContextMenuSubProps } from './types';

defineOptions({
  name: 'ContextMenuSub'
});

const props = withDefaults(defineProps<ContextMenuSubProps>(), {
  open: undefined
});

const emit = defineEmits<ContextMenuSubEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
});

useForwardExpose();
</script>

<template>
  <MenuSub v-model:open="open">
    <slot :open="open" />
  </MenuSub>
</template>
