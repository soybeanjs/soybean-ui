<script setup lang="ts">
import { MenuSub } from '../menu';
import { useForwardExpose } from '../../composables';
import type { ContextMenuSubProps } from './types';

defineOptions({
  name: 'ContextMenuSub'
});

const props = defineProps<ContextMenuSubProps>();

const open = defineModel<boolean>('open', {
  default: props.defaultOpen
});
useForwardExpose();
</script>

<template>
  <MenuSub v-model:open="open">
    <slot :open="open" />
  </MenuSub>
</template>
